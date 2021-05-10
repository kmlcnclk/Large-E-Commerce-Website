import { notifyError } from 'Components/toolbox/React-Toastify';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import React, { Component } from 'react';
import styles1 from 'styles/ProductsSold.module.css';
import styles from 'styles/Cart.module.css';
import styles2 from 'styles/MyOrders.module.css';

export default class MyLikesComponent extends Component {
  componentDidMount = async () => {
    try {
      await this.props.getMyLikesProduct({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
        },
      });
    } catch (err) {
      notifyError(err.message);
    }
  };

  render() {
    return (
      <div>
        {this.props.data ? (
          <div>
            {this.props.data.getMyLikesProduct.data[0] ? (
              <div
                style={{
                  borderRadius: '1rem',
                  marginTop: '1rem',
                }}
              >
                {this.props.data.getMyLikesProduct.data.map(
                  (products, index) => (
                    <div
                      className={`card mb-2 ${styles2.myOrdersCard}`}
                      key={index}
                      style={{
                        backgroundColor: '#f2f2f2',
                        borderRadius: '1rem',
                      }}
                    >
                      <div className="row no-gutters">
                        <div
                          className="col-md-6"
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

                        <div className="col-md-6" style={{ padding: '1rem' }}>
                          <div className="card-body">
                            <h4 className="card-title">
                              <strong>{products.product.name}</strong>
                            </h4>
                            <div
                              className="card-text"
                              style={{
                                marginTop: '1rem',
                              }}
                            >
                              <div>
                                <strong>Price: </strong>$
                                {products.product.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className={styles1.notProduct}>
                You don't like any product yet
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
