import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import React, { Component } from 'react';
import CreditCardInput from 'react-credit-card-input';
import styles from 'styles/OrderInformation.module.css';
import Cards from 'react-credit-cards';
import { Input } from '@chakra-ui/input';

export default class OrderInformationComponent extends Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
  formSubmit = async (e) => {
    e.preventDefault();

    const cart = this.props.getSingleUserData.getSingleUser.data.cart;

    try {
      await this.props.userAddress({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
          address: this.props.address,
        },
      });
    } catch (err) {
      this.props.toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
      this.props.toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
        this.props.toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      }
    }

    if (
      this.props.ordersData &&
      this.props.userAddressData &&
      this.props.creditCardData
    ) {
      this.props.toast({
        title:
          'Your information has been successfully saved and your order has been received',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };
  render() {
    const { formBgMode, cardExpiry, cardNumber, cardCVC, nameOnTheCard } =
      this.props;
    return (
      <Flex className={styles.flexDiv} align="center" justify="center">
        <Flex
          rounded={6}
          as="form"
          bg={formBgMode}
          className={styles.mainFlex}
          onSubmit={this.formSubmit}
        >
          <Flex m={3} direction="column">
            <Heading mb={6} textAlign="center">
              Order Info
            </Heading>
            <Textarea
              mb={3}
              placeholder="Your address"
              resize="both"
              variant="filled"
              size="md"
              isRequired
              onChange={(e) => this.props.setAddress(e.target.value)}
              name="content"
            />
            <Flex justify="center" align="center" direction="column" mb={6}>
              <Heading
                mb={6}
                text
                textAlign="center"
                fontWeight="semibold"
                size="sm"
              >
                Card Information
              </Heading>

              <Heading mb={3} size="sm">
                Name on the card
              </Heading>
              <Input
                type="text"
                variant="filled"
                placeholder="Iphone 10"
                mb={3}
                isRequired
                onChange={(e) => {
                  this.props.setNameOnTheCard(e.target.value);
                }}
                onFocus={this.handleInputFocus}
                name="name"
              />

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
                    onFocus={this.handleInputFocus}
                    name="number"
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
                    onFocus={this.handleInputFocus}
                    name="expiry"
                  />
                )}
                cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                  <input
                    {...props}
                    required
                    onChange={handleCardCVCChange((e) => {
                      this.props.setCardCVC(e.target.value);
                    })}
                    onFocus={this.handleInputFocus}
                    name="cvc"
                  />
                )}
                fieldClassName="input"
              />

              <Flex justify="center" align="center" mt={3}></Flex>
            </Flex>
          </Flex>
          <Flex m={3} direction="column">
            <Cards
              cvc={cardCVC}
              expiry={cardExpiry}
              focused={this.state.focus}
              name={nameOnTheCard}
              number={cardNumber}
            />

            <Button mt={7} type="submit" colorScheme="teal">
              Complete Order
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
