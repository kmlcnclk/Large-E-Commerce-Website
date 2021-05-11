import Category from 'Server/models/Category';
import { checkCategoryExist } from 'Server/middlewares/database/databaseErrorHelpers';
import productQueryMiddleware from 'Server/middlewares/query/productQueryMiddleware';
import Product from 'Server/models/Product';
import { addCategory } from 'Server/controllers/categories';

export const CategoryResolvers = {
  Query: {
    async getCategories() {
      return await Category.find();
    },
    async currentCategory(_, { slug, pageIndex, sortBy }, { req, res }) {
      await checkCategoryExist(slug, req, res);

      await productQueryMiddleware(
        res,
        sortBy,
        Product,
        {
          population: [
            {
              path: 'category',
              select: 'name',
            },
            {
              path: 'user',
              select: 'name',
            },
          ],
        },
        slug,
        pageIndex
      );
      return res.queryResults;
    },
  },
  Mutation: {
    async categoryAdd(_, { name, imageUrl }, { res }) {
      await addCategory(name, imageUrl, res);

      return res.status(200).results;
    },
  },
};
