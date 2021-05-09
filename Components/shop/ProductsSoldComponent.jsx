import React, { Component } from 'react';
import { getAccessTokenFromLocal } from '../../LocalStorage/accessTokenStorage';
import styles from '../../styles/Cart.module.css';
import styles1 from '../../styles/ProductsSold.module.css';
import { notifyError, notifySuccess } from '../toolbox/React-Toastify';

export default class ProductsSoldComponent extends Component {
  shipTheProduct = async (index) => {
    try {
      await this.props.postProductsSold({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
          index: index,
        },
      });
    } catch (err) {
      notifyError(err.message);
    }

    if (this.props.postProductsSoldData) {
      notifySuccess(this.props.postProductsSoldData.postProductsSold.message);

      setTimeout(() => {
        this.props.router.reload();
      }, 2400);
    }
  };

  render() {
    return (
      <div>
        {this.props.data ? (
          <div>
            {this.props.data.productsSold.data[0] ? (
              <div
                className="border"
                style={{ borderRadius: '1rem', marginTop: '1rem' }}
              >
                {this.props.data.productsSold.data.map((products, index) => (
                  <div
                    className={`card mb-2 ${styles.cartCard}`}
                    key={index}
                    style={{ backgroundColor: '#f2f2f2', borderRadius: '1rem' }}
                  >
                    <div className="row no-gutters">
                      <div
                        className="col-md-4"
                        style={{
                          justifyContent: 'center',
                          display: 'flex',
                          textAlign: 'center',
                        }}
                      >
                        <img
                          src={products.product.imageUrl}
                          className={`${styles.cartImage}`}
                        />
                      </div>

                      <div className="col-md-4" style={{ padding: '1rem' }}>
                        <div className="card-body">
                          <h4 className="card-title">
                            <strong>{products.product.name}</strong>
                          </h4>
                          <h5
                            className="card-title"
                            style={{
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              marginTop: '1rem',
                            }}
                          >
                            {products.quantity}
                          </h5>
                          <div
                            className="card-text"
                            style={{
                              marginTop: '1rem',
                            }}
                          >
                            <div>
                              <strong> Orderer's name: </strong>
                              {products.user.name}
                            </div>
                            <div>
                              <strong>Orderer's address: </strong>
                              {products.user.address}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <button
                          className={`btn btn-danger ${styles1.btn}`}
                          onClick={() => this.shipTheProduct(index)}
                        >
                          Ship the product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles1.notProduct}>
                You don't have any products sold yet
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
