import { CategoryResolvers } from './categoryResolvers';
import { UserResolvers } from './userResolvers';
import { ProductResolvers } from './productResolcers';
import { dateScalar } from '../CustomScalar/DateScalar';

export const resolvers = {
  Query: {
    ...CategoryResolvers.Query,
    ...ProductResolvers.Query,
    ...UserResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...ProductResolvers.Mutation,
    ...CategoryResolvers.Mutation,
  },

  Date: {
    dateScalar,
  },
};
