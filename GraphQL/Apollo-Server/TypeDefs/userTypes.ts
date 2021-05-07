const { gql } = require('apollo-server-micro');

export const UserTypes = gql`
  type User {
    name: String!
    email: String!
    _id: String!
    products: [Product]
    password: String!
    productCount: Int
    role: String
    slug: String
    profile_image: String
    resetPasswordToken: String
    resetPasswordExpire: Date
    cart: [Cart]
    cartCount: Int
    cartTotalPrice: Float
    createAt: Date
  }

  type Cart {
    quantity: Int
    product: Product
  }

  type Register {
    access_token: String
    data: User
    success: Boolean
    code: Int
    message: String
  }

  type Login {
    access_token: String
    data: User
    success: Boolean
    code: Int
    message: String
  }
  type Logout {
    success: Boolean
    code: Int
    message: String
  }
  type AddToCart {
    success: Boolean
    code: Int
    data: User
    message: String
  }
  type RemoveFromCart {
    success: Boolean
    code: Int
    data: User
    message: String
  }
  type FullRemoveFromCart {
    success: Boolean
    code: Int
    data: User
    message: String
  }
  type UserCart {
    success: Boolean
    code: Int
    data: User
  }

  type Profile {
    success: Boolean
    code: Int
    data: User
  }

  type ForgotPassword {
    success: Boolean
    code: Int
    message: String
  }

  type ResetPassword {
    success: Boolean
    code: Int
    message: String
  }

  type ProfileEdit {
    success: Boolean!
    data: User!
  }

  type ProfileImageEdit {
    success: Boolean!
    data: User!
    message: String!
  }
`;
