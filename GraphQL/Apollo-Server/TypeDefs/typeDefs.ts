const { gql } = require('apollo-server-micro');
const { CategoryTypes } = require('./categoryTypes');
const { ProductTypes } = require('./productTypes');
const { UserTypes } = require('./userTypes');

export const typeDefs = gql`
  type Query {
    getCategories: [Category]
    currentCategory(
      slug: String!
      pageIndex: Int!
      sortBy: String!
    ): CurrentCategoryPagination
    searchProduct(slug: String!, pageIndex: Int!): SearchProductPagination
    getSingleProduct(slug: String!): ProductDetail
    getAllProduct: [Product]
    cart(access_token: String!): UserCart!
    profile(access_token: String!): Profile!
    cloudinaryProfileImage: Cloudinary!
    productsSold(access_token: String!): ProductsSold!
    getMyOrders(access_token: String!): GetMyOrders!
    getMyLikesProduct(access_token: String!): GetMyLikesProduct!
    getSingleUser(access_token: String!): GetSingleUser!
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String
      profile_image: String
    ): Register
    login(email: String!, password: String!): Login
    logout(access_token: String!): Logout
    addToCart(_id: ID!, access_token: String!): AddToCart
    removeFromCart(_id: ID!, access_token: String!): RemoveFromCart
    fullRemoveFromCart(_id: ID!, access_token: String!): FullRemoveFromCart
    likeProduct(_id: ID!, access_token: String!): LikeProduct
    undoLikeProduct(_id: ID!, access_token: String!): UndoLikeProduct
    forgotPassword(email: String!): ForgotPassword
    resetPassword(password: String!, resetPasswordToken: String!): ResetPassword
    productAdd(
      access_token: String!
      name: String!
      content: String!
      price: Float!
      category: ID!
      imageUrl: [String!]
      stock: Int!
      brand: String!
    ): ProductAdd!
    productDelete(id: ID!, access_token: String!): ProductDelete!
    productStock(id: ID!, access_token: String!): ProductStock!
    productUpdate(
      access_token: String!
      name: String!
      content: String!
      price: Float!
      category: ID!
      imageUrl: [String!]
      id: ID!
      stock: Int!
      brand: String!
    ): ProductUpdate!
    profileEdit(
      access_token: String!
      name: String!
      email: String!
      password: String!
      profile_image: String!
    ): ProfileEdit!
    profileImageEdit(
      access_token: String!
      profile_image: String!
    ): ProfileImageEdit
    categoryAdd(name: String!, imageUrl: String!): CategoryAdd!
    postAddress(access_token: String!, address: String!): AddressData!
    postCard(
      access_token: String!
      cardName: String!
      cardNumber: String!
      cardExpiry: String!
      cardCVC: String!
    ): CardData!
    postOrder(access_token: String!, product: ID!, quantity: Int!): OrderData!
    postProductsSold(access_token: String!, index: Int!): Message!
    postStar(access_token: String!, star: Float!, productId: ID!): ProductStar!
  }

  scalar Date

  type Cloudinary {
    signature: String!
    timestamp: Int!
  }

  ${CategoryTypes}
  ${ProductTypes}
  ${UserTypes}
`;
