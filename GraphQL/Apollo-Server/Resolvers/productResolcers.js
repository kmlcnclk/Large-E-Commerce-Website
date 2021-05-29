import Product from 'Server/models/Product';
import searchProductQueryMiddleware from '../../../Server/middlewares/query/searchProductQueryMiddleware';
import singleProductQueryMiddleware from '../../../Server/middlewares/query/singleProductQueryMiddleware';
import {
  likeProduct,
  undoLikeProduct,
  addToProduct,
  deleteProduct,
  editProduct,
  productStock,
  postStar,
} from 'Server/controllers/products';
import {
  getAccessToRoute,
  getProductOwnerAccess,
} from 'Server/middlewares/auth/auth';
import {
  checkCategoryExistToProduct,
  checkProductExist,
  checkProductExist2,
} from '../../../Server/middlewares/database/databaseErrorHelpers';

export const ProductResolvers = {
  Query: {
    async searchProduct(_, { slug, pageIndex }, { req, res }) {
      await searchProductQueryMiddleware(pageIndex, slug, req, res, Product, {
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
      });
      return res.queryResults;
    },
    async getSingleProduct(_, { slug }, { req, res }) {
      await singleProductQueryMiddleware(slug, Product, res);
      return res.result;
    },
    async getAllProduct() {
      const product = await Product.find()
        .populate({
          path: 'category',
          select: 'name',
        })
        .populate({
          path: 'user',
          select: 'name',
        })
        .sort('-createAt');

      return product;
    },
  },
  Mutation: {
    async likeProduct(_, { _id, access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await likeProduct(_id, res);

      return res.results;
    },
    async undoLikeProduct(_, { _id, access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await undoLikeProduct(_id, res);

      return res.results;
    },
    async productAdd(
      _,
      { name, access_token, content, price, category, imageUrl, stock, brand },
      { res }
    ) {
      await checkCategoryExistToProduct(category);

      await checkProductExist(name.toLowerCase());

      await getAccessToRoute(access_token, res);

      await addToProduct(
        name,
        content,
        price,
        category,
        imageUrl,
        stock,
        brand,
        res
      );

      return res.status(200).results;
    },
    async productDelete(_, { access_token, id }, { res }) {
      await getAccessToRoute(access_token, res);

      await getProductOwnerAccess(id, res);

      await deleteProduct(id, res);

      return res.status(200).results;
    },
    async productStock(_, { access_token, id }, { res }) {
      await getAccessToRoute(access_token, res);

      await getProductOwnerAccess(id, res);

      await productStock(id, res);

      return res.status(200).results;
    },
    async productUpdate(
      _,
      {
        name,
        access_token,
        content,
        price,
        category,
        imageUrl,
        id,
        stock,
        brand,
      },
      { res }
    ) {
      await getAccessToRoute(access_token, res);

      await checkProductExist2(name, id);

      await getProductOwnerAccess(id, res);

      await editProduct(
        id,
        name,
        content,
        price,
        category,
        imageUrl,
        stock,
        brand,
        res
      );

      return res.status(200).results;
    },
    async postStar(_, { access_token, star, productId }, { res }) {
      await getAccessToRoute(access_token, res);

      await postStar(star, productId, res);

      return res.status(200).results;
    },
  },
};
