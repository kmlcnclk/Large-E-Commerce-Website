import { gql } from '@apollo/client';

export const LIKE_PRODUCT = gql`
  mutation likeProduct($access_token: String!, $_id: ID!) {
    likeProduct(access_token: $access_token, _id: $_id) {
      message
      data {
        name
        _id
        imageUrl
        content
        price
        slug
        likes
        likeCount
        user {
          _id
        }
      }
    }
  }
`;

export const UNDO_LIKE_PRODUCT = gql`
  mutation undoLikeProduct($access_token: String!, $_id: ID!) {
    undoLikeProduct(access_token: $access_token, _id: $_id) {
      message
      data {
        name
        _id
        imageUrl
        content
        price
        slug
        likes
        likeCount
        user {
          _id
        }
      }
    }
  }
`;

export const PRODUCT_ADD = gql`
  mutation productAdd(
    $access_token: String!
    $name: String!
    $price: Float!
    $imageUrl: [String!]
    $content: String!
    $category: ID!
  ) {
    productAdd(
      name: $name
      access_token: $access_token
      category: $category
      content: $content
      price: $price
      imageUrl: $imageUrl
    ) {
      success
      data {
        name
      }
      user {
        _id
        name
        cartTotalPrice
        email
        profile_image
        cartCount
        cart {
          quantity
          product {
            name
            imageUrl
            _id
            content
            price
          }
        }
      }
    }
  }
`;

export const PRODUCT_DELETE = gql`
  mutation productDelete($id: ID!, $access_token: String!) {
    productDelete(id: $id, access_token: $access_token) {
      message
      success
      user {
        _id
        name
        email
        profile_image
        cartTotalPrice
        cartCount
        cart {
          quantity
          product {
            name
            imageUrl
            _id
            content
            price
          }
        }
      }
    }
  }
`;

export const PRODUCT_UPDATE = gql`
  mutation productUpdate(
    $access_token: String!
    $name: String!
    $price: Float!
    $imageUrl: [String!]
    $content: String!
    $id: ID!
    $category: ID!
  ) {
    productUpdate(
      name: $name
      access_token: $access_token
      category: $category
      content: $content
      price: $price
      imageUrl: $imageUrl
      id: $id
    ) {
      success
      data {
        name
      }
      user {
        _id
        name
        cartTotalPrice
        cartCount
        email
        profile_image
        cart {
          quantity
          product {
            name
            imageUrl
            _id
            content
            price
          }
        }
      }
    }
  }
`;
