import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import {
  addUserToLocal,
  deleteUserFromLocal,
  getUserFromLocal,
} from 'LocalStorage/userStorage';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import CreditCardInput from 'react-credit-card-input';
import styles from 'styles/OrderInformation.module.css';

export default class OrderInformationComponent extends Component {
  formSubmit = async (e) => {
    e.preventDefault();

    const cart = getUserFromLocal()[0].cart;

    try {
      await this.props.userAddress({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
          address: this.props.address,
        },
      });
    } catch (err) {
      notifyError(err.message);
    }
    try {
      await this.props.creditCard({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
          cardNumber: this.props.cardNumber,
          cardExpiry: this.props.cardExpiry,
          cardCVC: this.props.cardCVC,
        },
      });
    } catch (err) {
      notifyError(err.message);
    }

    for (let i = 0; i < cart.length; i++) {
      try {
        await this.props.orders({
          variables: {
            access_token: await getAccessTokenFromLocal()[0],
            product: cart[i].product._id,
            quantity: cart[i].quantity,
          },
        });
      } catch (err) {
        notifyError(err.message);
        break;
      }
    }

    if (
      this.props.ordersData &&
      this.props.userAddressData &&
      this.props.creditCardData
    ) {
      await deleteUserFromLocal();
      notifySuccess('Your information has been successfully saved');
      await addUserToLocal(this.props.ordersData.postOrder.data);
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <div className={`border ${styles.mainDiv}`}>
          <Form onSubmit={this.formSubmit}>
            <Form.Group>
              <Form.Label>
                <strong>Address</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                onChange={(e) => this.props.setAddress(e.target.value)}
                style={{ backgroundColor: '#f2f2f2' }}
              />
            </Form.Group>
            <div className="m-3">
              <div className="mb-2">
                <strong>Card Information</strong>
              </div>
              <CreditCardInput
                cardNumberInputRenderer={({
                  handleCardNumberChange,
                  props,
                }) => (
                  <input
                    {...props}
                    required
                    onChange={handleCardNumberChange((e) => {
                      this.props.setCardNumber(e.target.value);
                    })}
                  />
                )}
                cardExpiryInputRenderer={({
                  handleCardExpiryChange,
                  props,
                }) => (
                  <input
                    {...props}
                    required
                    onChange={handleCardExpiryChange((e) => {
                      this.props.setCardExpiry(e.target.value);
                    })}
                  />
                )}
                cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                  <input
                    {...props}
                    required
                    onChange={handleCardCVCChange((e) => {
                      this.props.setCardCVC(e.target.value);
                    })}
                  />
                )}
                fieldClassName="input"
              />
            </div>
            <button type="submit" className="btn btn-danger btn-block">
              Complete Order
            </button>
          </Form>
        </div>
      </div>
    );
  }
}
