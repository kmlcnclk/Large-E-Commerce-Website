import React, { Component } from 'react';
import styles from 'styles/Profile.module.css';
import styles1 from 'styles/ProductCard.module.css';
import Link from 'next/link';
import { RiShoppingCartLine } from 'react-icons/ri';
import ProfileImage from './ProfileImage';
import Image from 'next/image';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { addUserToLocal, deleteUserFromLocal } from 'LocalStorage/userStorage';

class ProfileComponent extends Component {
  state = {
    user: {},
    profileImageStatic: '',
    userCartState1: false,
    userCartState2: true,
    userProductState1: false,
    userProductState2: true,
    deleted: false,
  };

  async componentDidMount() {
    if (this.props.user) {
      if (this.props.user.cart[0]) {
        await this.props.setUserCartState2(false);
      }
      if (this.props.user.products[0]) {
        await this.props.setUserProductState2(false);
      }
    }
  }
  profileCartVisible = (e) => {
    this.props.setUserCartState1(!this.props.userCartState1);
  };

  profileProductVisible = () => {
    this.props.setUserProductState1(!this.props.userProductState1);
  };

  deleteProductBtn = async (id) => {
    try {
      await this.props.productDelete({
        variables: {
          access_token: getAccessTokenFromLocal()[0],
          id: id,
        },
      });
    } catch (err) {
      notifyError(err.message);
    }

    if (this.props.productDeleteData) {
      await deleteUserFromLocal();
      notifySuccess(this.props.productDeleteData.productDelete.message);
      await addUserToLocal(this.props.productDeleteData.productDelete.user);

      setTimeout(() => {
        window.location.reload();
      }, 2200);
    }
  };

  render() {
    const {
      user,
      userCartState1,
      userCartState2,
      userProductState1,
      userProductState2,
    } = this.props;
    return (
      <div>
        <div>
          <div className={`border mt-2 ${styles.profileMainDiv}`}>
            <div className={`${styles.profileChildDiv1}`}>
              <ProfileImage profileImageStatic={user.profile_image} />
              <div className={`${styles.profileChildDiv2}`}>
                <div className={`${styles.profileNameAndBtn}`}>
                  <div className={`${styles.profileNameDiv}`}>
                    <h4 className={`${styles.profileNameH}`}>
                      <strong>{user.name}</strong>
                    </h4>
                  </div>

                  <Link href="/profileEdit">
                    <a
                      className={`btn btn-danger btn-sm ${styles.profileEditProfileBtn}`}
                    >
                      Edit profile
                    </a>
                  </Link>
                </div>
                <div className={`${styles.profileCartCount}`}>
                  <div className={`${styles.profileCartMainDiv}`}>
                    <div className="d-inline-block">
                      <Link href="/cart">
                        <a style={{ color: 'black' }}>
                          <RiShoppingCartLine
                            style={{
                              padding: '1px',
                              cursor: 'pointer',
                              marginBottom: '0.5rem',
                            }}
                            size={23}
                          />
                        </a>
                      </Link>
                    </div>
                    <div
                      className="d-inline-block"
                      style={{ marginLeft: '0.5rem' }}
                    >
                      <strong> {user.cartCount}</strong>
                    </div>

                    <div
                      className={`d-inline-block ml-5 ${styles.profileCartMainDiv}`}
                    >
                      <div className="d-inline-block">
                        <strong>Your products:</strong>
                      </div>
                      <div
                        className="d-inline-block"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <strong> {user.productCount}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={this.profileCartVisible}
            id="profileCartVisible"
            className={`border mt-2 d-block justify-content-center ${
              userCartState1
                ? styles.profileMainCartDiv2
                : styles.profileMainCartDiv1
            }`}
          >
            <strong>Your Cart</strong>
          </div>
          {userCartState1 ? (
            <div>
              {userCartState2 ? (
                <div
                  id="profileCartVisible"
                  className={`border mt-2 d-block justify-content-center ${styles.profileMainCartDiv2}`}
                >
                  <strong>Empty Your Cart</strong>
                </div>
              ) : (
                <div
                  className={`border mt-2 d-flex justify-content-center ${styles.profileMainCartDiv3}`}
                >
                  <div className={styles.cartDiv}>
                    {user.cart.map((cartItem) => (
                      <div
                        key={cartItem.product._id}
                        className={`card ${styles1.card}`}
                        style={{
                          display: 'inline-block',
                          borderRadius: '1rem',
                          backgroundColor: '#f2f2f2',
                        }}
                      >
                        <div
                          className={styles1.imgMarginTop}
                          style={{ padding: '0.5rem' }}
                        >
                          <Image
                            src={cartItem.product.imageUrl[0]}
                            className={`img ${styles1.img}`}
                            width={800}
                            height={800}
                            alt="..."
                          />
                        </div>

                        <div className={`card-body ${styles1.cardBody}`}>
                          <h5 className={`card-title ${styles1.cardTitle}`}>
                            <div className={`${styles1.titleName}`}>
                              {cartItem.product.name}
                            </div>
                            <br />
                            <div className={`${styles1.price}`}>
                              $ {parseFloat(cartItem.product.price).toFixed(2)}
                            </div>
                          </h5>
                          <p className={`card-text ${styles1.cardText}`}>
                            {cartItem.product.content}
                          </p>
                          <Link href={`/product/${cartItem.product.slug}`}>
                            <a
                              className="btn btn-block btn-primary"
                              style={{ fontSize: '0.9rem' }}
                            >
                              <strong>Go to Product</strong>
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <div
            onClick={this.profileProductVisible}
            className={`border mt-2 d-block justify-content-center ${
              userProductState1
                ? styles.profileMainProductDiv2
                : styles.profileMainProductDiv1
            }`}
          >
            <strong>Your Products</strong>
          </div>
          {userProductState1 ? (
            <div>
              {userProductState2 ? (
                <div
                  onClick={this.profileProductVisible}
                  className={`border mt-2 d-block justify-content-center ${styles.profileMainProductDiv2}`}
                >
                  <strong>You Have No Products</strong>
                </div>
              ) : (
                <div
                  className={`border mt-2 d-flex justify-content-center ${styles.profileMainProductDiv3}`}
                >
                  <div className={styles.productDiv}>
                    {user.products.map((product) => (
                      <div
                        key={product._id}
                        className={`card ${styles1.card}`}
                        style={{
                          display: 'inline-block',
                          borderRadius: '1rem',
                          backgroundColor: '#f2f2f2',
                        }}
                      >
                        <div
                          className={styles1.imgMarginTop}
                          style={{ padding: '0.5rem' }}
                        >
                          <Image
                            src={product.imageUrl[0]}
                            className={`img ${styles1.img}`}
                            width={800}
                            height={800}
                            alt="..."
                          />
                        </div>
                        <div className={`card-body ${styles1.cardBody}`}>
                          <h5 className={`card-title ${styles1.cardTitle}`}>
                            <div className={`${styles1.titleName}`}>
                              {product.name}
                            </div>
                            <br />
                            <div className={`${styles1.price}`}>
                              $ {parseFloat(product.price).toFixed(2)}
                            </div>
                          </h5>
                          <p className={`card-text ${styles1.cardText}`}>
                            {product.content}
                          </p>
                          <Link href={`/productUpdate/${product.slug}`}>
                            <a
                              className="btn btn-block btn-primary"
                              style={{ fontSize: '0.9rem' }}
                            >
                              <strong>Go to Product Update</strong>
                            </a>
                          </Link>
                          <button
                            className="btn btn-block btn-danger"
                            style={{
                              fontSize: '0.9rem',
                              marginTop: '0.7rem',
                            }}
                            onClick={() => this.deleteProductBtn(product._id)}
                          >
                            <strong>Delete Product</strong>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
