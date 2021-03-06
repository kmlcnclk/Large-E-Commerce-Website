import { gql } from '@apollo/client';

export const CART = gql`
  query cart($access_token: String!) {
    cart(access_token: $access_token) {
      success
      data {
        name
        cartCount
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
          stockState
        }
        productCount
        name
        email
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
        _id
        content
        price
        imageUrl
        name
        slug
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query getSingleUser($access_token: String!) {
    getSingleUser(access_token: $access_token) {
      success
      data {
        name
        email
        _id
        products {
          name
        }
        productCount
        role
        slug
        profile_image
        cart {
          quantity
          product {
            _id
            name
          }
        }
        cartCount
        resetPasswordToken
        resetPasswordExpire
        cartTotalPrice
        createAt
        address
        creditCard {
          cardExpiry
          cardNumber
          cardCVC
        }
        orders {
          quantity
          product
          user
        }
        myOrders {
          quantity
          product
        }
        likes
        likeCount
      }
    }
  }
`;
