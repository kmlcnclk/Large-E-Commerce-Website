const { gql } = require('apollo-server-micro');

export const CategoryTypes = gql`
  type Category {
    _id: ID!
    name: String!
    slug: String!
    products: [Product]
    productCount: Int
    createAt: Date
    imageUrl: String!
  }

  type CurrentCategoryPagination {
    data: [Product]
    success: Boolean
    code: Int
    message: String
    count: Int
    pagination: Pagination
  }

  type Pagination {
    previous: Previous
    next: Previous
  }

  type Previous {
    page: Int
    limit: Int
  }

  type CategoryAdd {
    success: Boolean!
    data: Category!
  }
`;
