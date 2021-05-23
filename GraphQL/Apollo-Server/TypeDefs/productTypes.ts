const { gql } = require('apollo-server-micro');

export const ProductTypes = gql`
  type Product {
    name: String
    content: String
    _id: String
    price: Float
    imageUrl: [String!]
    slug: String
    category: Category
    likes: [ID]
    likeCount: Int
    user: User
    createAt: Date
    stockState: Boolean
  }

  type SearchProductPagination {
    data: [Product]
    success: Boolean
    code: Int
    message: String
    count: Int
    pagination: Pagination
  }

  type ProductDetail {
    data: Product
    success: Boolean
    code: Int
    message: String
  }

  type LikeProduct {
    data: Product
    success: Boolean
    code: Int
    message: String
  }

  type UndoLikeProduct {
    data: Product
    success: Boolean
    code: Int
    message: String
  }

  type ProductAdd {
    success: Boolean!
    data: Product!
    user: User!
  }

  type ProductDelete {
    success: Boolean!
    message: String!
    user: User!
  }

  type ProductUpdate {
    success: Boolean!
    data: Product!
    user: User!
  }
`;
