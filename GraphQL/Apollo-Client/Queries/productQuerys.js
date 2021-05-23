import { gql } from '@apollo/client';

export const SEARCH_PRODUCT = gql`
  query searchProduct($slug: String!, $pageIndex: Int!) {
    searchProduct(slug: $slug, pageIndex: $pageIndex) {
      success
      count
      pagination {
        previous {
          page
          limit
        }
        next {
          limit
          page
        }
      }
      data {
        name
        _id
        imageUrl
        content
        price
        slug
        likes
        likeCount
        createAt
      }
    }
  }
`;

export const PRODUCT_DETAIL = gql`
  query getSingleProduct($slug: String!) {
    getSingleProduct(slug: $slug) {
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
        # category {
        #   _id
        #   slug
        #   name
        # }
      }
      success
      code
    }
  }
`;

export const GET_ALL_PRODUCT = gql`
  query {
    getAllProduct {
      slug
    }
  }
`;
