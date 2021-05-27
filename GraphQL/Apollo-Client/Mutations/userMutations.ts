import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation register(
    $email: String!
    $name: String!
    $password: String!
    $profile_image: String!
  ) {
    register(
      email: $email
      password: $password
      name: $name
      profile_image: $profile_image
    ) {
      success
      code
      message
      access_token
      data {
        _id
        name
        email
        profile_image
        cart {
          quantity
          product {
            name
          }
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      code
      message
      access_token
      data {
        name
        email
        profile_image
        _id
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

export const LOGOUT_MUTATION = gql`
  mutation logout($access_token: String!) {
    logout(access_token: $access_token) {
      success
      code
      message
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($access_token: String!, $_id: ID!) {
    addToCart(access_token: $access_token, _id: $_id) {
      success
      message
      data {
        name
        _id
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
export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($access_token: String!, $_id: ID!) {
    removeFromCart(access_token: $access_token, _id: $_id) {
      success
      message
      data {
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
export const FULL_REMOVE_FROM_CART = gql`
  mutation fullRemoveFromCart($access_token: String!, $_id: ID!) {
    fullRemoveFromCart(access_token: $access_token, _id: $_id) {
      success
      message
      data {
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

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $resetPasswordToken: String!) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
    ) {
      message
    }
  }
`;

export const PROFILE_EDIT = gql`
  mutation profileEdit(
    $access_token: String!
    $email: String!
    $name: String!
    $password: String!
    $profile_image: String!
  ) {
    profileEdit(
      access_token: $access_token
      name: $name
      email: $email
      password: $password
      profile_image: $profile_image
    ) {
      success
      data {
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

export const PROFILE_IMAGE_EDIT = gql`
  mutation profileImageEdit($access_token: String!, $profile_image: String!) {
    profileImageEdit(
      access_token: $access_token
      profile_image: $profile_image
    ) {
      success
      message
      data {
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

export const ADDRESS = gql`
  mutation postAddress($access_token: String!, $address: String!) {
    postAddress(access_token: $access_token, address: $address) {
      success
      data {
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
export const CREDITCARD = gql`
  mutation postCard(
    $access_token: String!
    $cardName: String!
    $cardNumber: String!
    $cardCVC: String!
    $cardExpiry: String!
  ) {
    postCard(
      access_token: $access_token
      cardName: $cardName
      cardNumber: $cardNumber
      cardCVC: $cardCVC
      cardExpiry: $cardExpiry
    ) {
      success
      data {
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
export const ORDERS = gql`
  mutation postOrder($access_token: String!, $product: ID!, $quantity: Int!) {
    postOrder(
      access_token: $access_token
      product: $product
      quantity: $quantity
    ) {
      success
      data {
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

export const POST_PRODUCTS_SOLD = gql`
  mutation postProductsSold($access_token: String!, $index: Int!) {
    postProductsSold(access_token: $access_token, index: $index) {
      message
    }
  }
`;
