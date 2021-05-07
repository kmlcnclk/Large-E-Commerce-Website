import React, { Component } from 'react';
import styles from 'styles/ProductDetail.module.css';
import Image from 'next/image';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import {
  deleteUserFromLocal,
  addUserToLocal,
  getUserFromLocal,
} from 'LocalStorage/userStorage';
import { notifySuccess, notifyError } from '../toolbox/React-Toastify';
import { ToastContainer } from 'react-toastify';
import ImageZoom from 'react-medium-image-zoom';

class ProductDetailComponent extends Component {
  state = {
    images: [],
    index: 0,
    like: false,
  };

  async componentDidMount() {
    this.props.setProductDetail(this.props.data);

    const timing = setTimeout(() => {
      const { index } = this.state;
      this.myRef.current.children[
        index
      ].className = `${styles.thumbImageActive} ${styles.thumbImage}`;
    }, 1000);

    if (window.localStorage.getItem('User')) {
      const user = JSON.parse(window.localStorage.getItem('User'))[0];

      var result = this.props.data.likes.includes(user._id);
      if (result) {
        this.setState({ like: true });
      }
    }

    return () => clearTimeout(timing);
  }

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        `${styles.thumbImageActive} ${styles.thumbImage}`,
        `${styles.thumbImage}`
      );
    }
    images[index].className = `${styles.thumbImageActive} ${styles.thumbImage}`;
  };

  addToCart = async () => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.addToCart({
        variables: {
          access_token: token ? token : '',
          _id: this.props.data._id,
        },
      });
    } catch (err) {
      notifyError(this.props.addToCartError.message);
    }

    if (this.props.addToCartData) {
      await deleteUserFromLocal();
      await addUserToLocal(this.props.addToCartData.addToCart.data);
      notifySuccess(
        `${this.props.data.name} ${this.props.addToCartData.addToCart.message}`
      );
    }
  };

  likeOrUndoLikeProduct = async (product) => {
    if (getUserFromLocal()[0]) {
      const user = getUserFromLocal()[0];

      var result = product.likes.includes(user._id);
      if (result) {
        const token = getAccessTokenFromLocal()[0];

        try {
          await this.props.undoLikeProduct({
            variables: {
              access_token: token ? token : '',
              _id: this.props.productDetail._id,
            },
          });
        } catch (err) {
          notifyError(this.props.undoLikeProductError.message);
        }

        if (this.props.undoLikeProductData) {
          await this.props.setProductDetail(
            this.props.undoLikeProductData.undoLikeProduct.data
          );

          this.setState({ like: false });
          notifySuccess(
            `${this.props.undoLikeProductData.undoLikeProduct.message}`
          );
        }
      } else {
        const token = getAccessTokenFromLocal()[0];

        try {
          await this.props.likeProduct({
            variables: {
              access_token: token ? token : '',
              _id: this.props.productDetail._id,
            },
          });
        } catch (err) {
          notifyError(this.props.likeProductError.message);
        }

        if (this.props.likeProductData) {
          await this.props.setProductDetail(
            this.props.likeProductData.likeProduct.data
          );

          this.setState({ like: true });
          notifySuccess(`${this.props.likeProductData.likeProduct.message}`);
        }
      }
    } else {
      notifyError('You are not logged in');
    }
  };

  mainPage() {
    const product = this.props.productDetail;
    if (product.name) {
      return (
        <div className={`${styles.productDetail} mt-2`}>
          <div
            className={`border ${styles.productRow}`}
            style={{ borderRadius: '1.5rem' }}
          >
            <div className={`${styles.colasd}`}>
              {/* <ImageZoom> */}
              <Image
                width={300}
                src={product.imageUrl[this.state.index]}
                id="MainImage"
                height={300}
                layout="intrinsic"
                className={`${styles.img2}`}
                alt="ProductImage"
                priority
              />
              {/* </ImageZoom> */}
            </div>
            <div className={`${styles.colasd2}`}>
              <h5 className={`${styles.productName}`}>
                <strong>{product.name}</strong>
              </h5>
              <div className={`${styles.productPrice}`}>
                <div className={`d-inline ${styles.productPriceItem1}`}>
                  <strong>
                    <strike>${parseFloat(product.price).toFixed(2)}</strike>
                  </strong>
                </div>
                <div className={`d-inline ${styles.productPriceItem2}`}>
                  <strong>${parseFloat(product.price).toFixed(2)}</strong>
                </div>
              </div>
              <div className={`${styles.productContent}`}>
                <strong>{product.content}</strong>
              </div>
              <div className={`${styles.productLike}`}>
                <div className="d-inline">
                  <div
                    className={`d-inline ${styles.productLikeCount}`}
                    style={{ fontSize: '1rem', color: '#616161' }}
                  >
                    <strong> Likes: {product.likeCount}</strong>
                  </div>
                  <div className="mt-3">
                    {this.state.like ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        onClick={() => this.likeOrUndoLikeProduct(product)}
                        style={{
                          color: 'red',
                          fontSize: '2rem',
                          cursor: 'pointer',
                        }}
                        fill="currentColor"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        onClick={() => this.likeOrUndoLikeProduct(product)}
                        style={{
                          color: 'red',
                          fontSize: '2rem',
                          cursor: 'pointer',
                        }}
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className={`${styles.thumb}`} ref={this.myRef}>
                {product.imageUrl.map((img, index) => (
                  <div
                    key={index}
                    className={styles.thumbImage}
                    onClick={() => this.handleTab(index)}
                  >
                    <Image
                      src={img}
                      width={100}
                      height={100}
                      className={styles.imageBorderRadius}
                      alt="ProductImage"
                    />
                  </div>
                ))}
              </div>
              <div className={`${styles.addToCart}`}>
                <button
                  type="button"
                  onClick={this.addToCart}
                  className="btn btn-block  btn-warning"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.mainPage()}</div>;
  }
}

export default ProductDetailComponent;
