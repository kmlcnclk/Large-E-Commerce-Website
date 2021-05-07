import React, { Component } from 'react';
import styles from '../../styles/Cart.module.css';
import { Badge } from 'react-bootstrap';
import { addUserToLocal, deleteUserFromLocal } from 'LocalStorage/userStorage';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { BsPlusCircle, BsDashCircle, BsTrash } from 'react-icons/bs';
import { RiShoppingCartLine } from 'react-icons/ri';

class CartComponent extends Component {
  // Düzelt
  emptyCart = () => {
    return (
      <div className="text-center">
        <div
          style={{
            fontSize: '1.3rem',
            marginTop: '2rem',
            color: 'grey',
            fontWeight: '600',
            fontFamily: 'cursive',
          }}
        >
          Empty Your Cart
        </div>

        <div style={{ marginTop: '3rem' }}>
          <RiShoppingCartLine color="grey" size={100} />
        </div>
      </div>
    );
  };

  removeFromCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.removeFromCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
        },
      });
    } catch (err) {
      notifyError(this.props.removeFromCartError.message);
    }
    if (this.props.removeFromCartData) {
      await deleteUserFromLocal();
      await addUserToLocal(this.props.removeFromCartData.removeFromCart.data);

      this.props.setUserCart(
        this.props.removeFromCartData.removeFromCart.data.cart
      );
      this.props.setUser(this.props.removeFromCartData.removeFromCart.data);

      notifySuccess(
        `${product.product.name} ${this.props.removeFromCartData.removeFromCart.message}`
      );
    }
    setTimeout(() => {
      if (!this.props.userCart[0]) {
        this.props.router.reload();
      }
    }, 2000);
  };

  fullRemoveFromCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.fullRemoveFromCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
        },
      });
    } catch (err) {
      notifyError(this.props.fullRemoveFromCartError.message);
    }
    if (this.props.fullRemoveFromCartData) {
      await deleteUserFromLocal();
      await addUserToLocal(
        this.props.fullRemoveFromCartData.fullRemoveFromCart.data
      );

      this.props.setUserCart(
        this.props.fullRemoveFromCartData.fullRemoveFromCart.data.cart
      );
      this.props.setUser(
        this.props.fullRemoveFromCartData.fullRemoveFromCart.data
      );

      notifySuccess(
        `${product.product.name} ${this.props.fullRemoveFromCartData.fullRemoveFromCart.message}`
      );
    }
    setTimeout(() => {
      if (!this.props.userCart[0]) {
        this.props.router.reload();
      }
    }, 2000);
  };

  addToCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.addToCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
        },
      });
    } catch (err) {
      notifyError(this.props.addToCartError.message);
    }
    if (this.props.addToCartData) {
      await deleteUserFromLocal();
      await addUserToLocal(this.props.addToCartData.addToCart.data);

      this.props.setUserCart(this.props.addToCartData.addToCart.data.cart);
      this.props.setUser(this.props.addToCartData.addToCart.data);

      notifySuccess(
        `${product.product.name} ${this.props.addToCartData.addToCart.message}`
      );
    }
  };

  fullCart = () => {
    const { userCart, user, data } = this.props;
    return (
      <div>
        {data ? (
          <div>
            <div className={`mt-2 ${styles.cartMainDiv}`}>
              <div
                className={`${styles.cardProductDiv}`}
                style={{ display: 'inline', paddingRight: '0rem' }}
              >
                {userCart.map((product) => (
                  <div
                    className={`card mb-2 ${styles.cartCard}`}
                    key={product.product._id}
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
                          src={product.product.imageUrl[0]}
                          className={`${styles.cartImage}`}
                          alt="ProductImage"
                        />
                      </div>
                      <div className="col-md-8" style={{ padding: '1rem' }}>
                        <div className="card-body">
                          <h4 className="card-title">
                            <strong>{product.product.name}</strong>
                          </h4>
                          <h5
                            className="card-title"
                            style={{
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              marginTop: '1rem',
                            }}
                          >
                            <strong>$</strong>{' '}
                            {parseFloat(product.product.price).toFixed(2)}
                          </h5>
                          <p
                            className="card-text"
                            style={{
                              marginTop: '1rem',
                            }}
                          >
                            {product.product.content}
                          </p>

                          <div className={`${styles.cartAddOrRemoveQuantity}`}>
                            <div className="d-inline-block m-1">
                              <BsPlusCircle
                                onClick={() => this.addToCart(product)}
                                size={23}
                              />
                              <div className="m-1 d-inline-block">
                                <Badge
                                  className={`${styles.cartCartQuantityBadge}`}
                                >
                                  {product.quantity}
                                </Badge>
                              </div>

                              <BsDashCircle
                                onClick={() => this.removeFromCart(product)}
                                size={23}
                              />
                            </div>
                            <div className="d-inline-block m-1 mt-2">
                              <BsTrash
                                onClick={() => this.fullRemoveFromCart(product)}
                                size={25}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${styles.totalProductCart}`}>
                <div
                  className="card"
                  style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: '1rem',
                    padding: '0.5rem',
                  }}
                >
                  <div className={`${styles.cartCartCount}`}>
                    <div className={`${styles.cartCartCountText}`}>
                      Total number of products:{' '}
                    </div>
                    <Badge className={`${styles.cartCartCountNumber}`}>
                      {user.cartCount}
                    </Badge>
                  </div>
                  <div className={`${styles.cartCartPrice}`}>
                    <div className={`${styles.cartCartPriceText}`}>
                      Total basket price:{' '}
                    </div>
                    <Badge className={`${styles.cartCartPriceNumber}`}>
                      <strong>$</strong>{' '}
                      {parseFloat(user.cartTotalPrice).toFixed(2)}
                    </Badge>
                  </div>
                  <button className="btn btn-danger block m-1">
                    Complete shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { cart } = this.props;
    return <div>{cart ? this.fullCart() : this.emptyCart()}</div>;
  }
}

export default CartComponent;
