import {
  isTheUserRegistered,
  getAccessToRoute,
} from '../../../Server/middlewares/auth/auth';
import { login, register, logout } from '../../../Server/controllers/auth';
const cloudinary = require('cloudinary').v2;
import {
  addToCart,
  removeFromCart,
  fullRemoveFromCart,
  userCart,
  profile,
  forgotPassword,
  resetPassword,
  edit,
  uploadImage,
  getAddress,
  getCreditCard,
  postOrders,
  getProductsSold,
  postProductsSold,
  getMyOrders,
  getMyLikesProduct,
  getSingleUser,
} from 'Server/controllers/auth';

export const UserResolvers = {
  Query: {
    async cart(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await userCart(res);
      return res.results;
    },
    async profile(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await profile(res);

      return res.results;
    },
    cloudinaryProfileImage(_, __, { res }) {
      const timestamp = Math.round(new Date().getTime() / 1000);

      var signature = cloudinary.utils.api_sign_request(
        {
          timestamp,
        },
        process.env.CLOUDINARY_SECRET
      );

      res.results = { signature, timestamp };

      return res.status(200).results;
    },
    async productsSold(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await getProductsSold(res);

      return res.status(200).results;
    },
    async getMyOrders(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await getMyOrders(res);

      return res.status(200).results;
    },
    async getMyLikesProduct(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await getMyLikesProduct(res);

      return res.status(200).results;
    },
    async getSingleUser(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await getSingleUser(res);

      return res.status(200).results;
    },
  },
  Mutation: {
    async register(_, { name, password, email, profile_image }, { res }) {
      await isTheUserRegistered(email, name);

      await register(res, name, password, email, profile_image);

      return res.result;
    },
    async login(_, { email, password }, { res }) {
      await login(email, password, res);

      return res.result;
    },
    async logout(_, { access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await logout(res);

      return res.result;
    },
    async addToCart(_, { _id, access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await addToCart(_id, res);

      return res.results;
    },
    async removeFromCart(_, { _id, access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await removeFromCart(_id, res);

      return res.results;
    },
    async fullRemoveFromCart(_, { _id, access_token }, { res }) {
      await getAccessToRoute(access_token, res);

      await fullRemoveFromCart(_id, res);

      return res.results;
    },
    async forgotPassword(_, { email }, { res }) {
      await forgotPassword(email, res);

      return res.results;
    },
    async resetPassword(_, { password, resetPasswordToken }, { res }) {
      await resetPassword(password, resetPasswordToken, res);

      return res.results;
    },
    async profileEdit(
      _,
      { access_token, name, email, password, profile_image },
      { res }
    ) {
      await getAccessToRoute(access_token, res);

      await edit(name, email, password, profile_image, res);

      return res.status(200).results;
    },
    async profileImageEdit(_, { access_token, profile_image }, { res }) {
      await getAccessToRoute(access_token, res);

      await uploadImage(profile_image, res);

      return res.status(200).results;
    },
    async postAddress(_, { access_token, address }, { res }) {
      await getAccessToRoute(access_token, res);

      await getAddress(address, res);

      return res.status(200).results;
    },
    async postCard(
      _,
      { access_token, cardName, cardNumber, cardExpiry, cardCVC },
      { res }
    ) {
      await getAccessToRoute(access_token, res);

      await getCreditCard(cardName, cardNumber, cardExpiry, cardCVC, res);

      return res.status(200).results;
    },
    async postOrder(_, { access_token, product, quantity }, { res }) {
      await getAccessToRoute(access_token, res);

      await postOrders(product, quantity, res);

      return res.status(200).results;
    },
    async postProductsSold(_, { access_token, index }, { res }) {
      await getAccessToRoute(access_token, res);

      await postProductsSold(index, res);

      return res.status(200).results;
    },
  },
};
