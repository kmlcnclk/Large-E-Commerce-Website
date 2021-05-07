import { gql } from '@apollo/client';

export const CART = gql`
  query cart($access_token: String!) {
    cart(access_token: $access_token) {
      success
      data {
        name
        cartCount
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
