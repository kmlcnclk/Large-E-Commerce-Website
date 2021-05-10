import { gql } from '@apollo/client';

export const CART = gql`
  query cart($access_token: String!) {
    cart(access_token: $access_token) {
      success
      data {
        name
        cartCount
        creditCard {
          cardNumber
          cardExpiry
          cardCVC
        }
        address
        email
        cartTotalPrice
        cart {
          quantity
          product {
            _id
            content
            price
            imageUrl
            name
          }
        }
      }
    }
  }
`;

export const PROFILE = gql`
  query profile($access_token: String!) {
    profile(access_token: $access_token) {
      success
      code
      data {
        products {
          _id
          content
          price
          imageUrl
          name
          slug
        }
        productCount
        name
        email
        creditCard {
          cardNumber
          cardExpiry
          cardCVC
        }
        address
        cartCount
        profile_image
        cartTotalPrice
        cart {
          quantity
          product {
            _id
            content
            price
            imageUrl
            name
            slug
          }
        }
      }
    }
  }
`;

export const CLOUDINARY_PROFILE_IMAGE = gql`
  query {
    cloudinaryProfileImage {
      signature
      timestamp
    }
  }
`;

export const PRODUCTS_SOLD = gql`
  query productsSold($access_token: String!) {
    productsSold(access_token: $access_token) {
      success
      data {
        quantity
        user {
          name
          address
        }
        product {
          name
          imageUrl
        }
      }
    }
  }
`;
export const GET_MY_ORDERS = gql`
  query getMyOrders($access_token: String!) {
    getMyOrders(access_token: $access_token) {
      success
      data {
        quantity
        product {
          name
          price
          imageUrl
        }
      }
    }
  }
`;
export const GET_MY_LIKES_PRODUCT = gql`
  query getMyLikesProduct($access_token: String!) {
    getMyLikesProduct(access_token: $access_token) {
      success
      data {
        product {
          name
          imageUrl
          price
        }
      }
    }
  }
`;
