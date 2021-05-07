import { gql } from '@apollo/client';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      name
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($name: String!) {
    deleteCategory(name: $name) {
      name
    }
  }
`;
