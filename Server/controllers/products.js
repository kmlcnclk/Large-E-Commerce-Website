const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const User = require('../models/User');
const fetch = require('node-fetch');
const { ApolloError } = require('apollo-server-errors');

// Add to product
const addToProduct = asyncHandler(
  async (name, content, price, category, imageUrl, res) => {
    const user_id = res.user.id;

    const product = await Product.create({
      name,
      content,
      price,
      category,
      user: user_id,
      imageUrl,
    });

    const user = await User.findById(user_id)
      .populate({
        path: 'products',
        select: 'name content price imageUrl slug',
      })
      .populate({
        path: 'cart.product',
        select: 'name content price imageUrl slug',
      });

    res.results = {
      success: true,
      data: product,
      user: user,
    };
  }
);

// Like product
const likeProduct = asyncHandler(async (_id, res) => {
  const { id } = res.user;

  const product = await Product.findById(_id);

  if (product.likes.includes(id)) {
    throw new ApolloError('You already like this product', 400);
  }

  product.likes.push(id);
  product.likeCount = product.likes.length;

  await product.save();

  res.results = {
    code: 200,
    message: 'You like the product',
    success: true,
    data: product,
  };
});

// Undo like product
const undoLikeProduct = asyncHandler(async (_id, res) => {
  const { id } = res.user;

  const product = await Product.findById(_id);

  if (!product.likes.includes(id)) {
    throw new ApolloError("You don't like this product yet", 400);
  }

  const index = await product.likes.indexOf(id);
  await product.likes.splice(index, 1);
  product.likeCount = product.likes.length;

  await product.save();

  res.results = {
    code: 200,
    success: true,
    data: product,
    message: 'You undo like the product',
  };
});

// Edit product
const editProduct = asyncHandler(
  async (id, name, content, price, category, imageUrl, res) => {
    const userId = res.user.id;

    const categorys = await Category.findById(category);

    if (!categorys) {
      throw new ApolloError('There is no such category with that id', 400);
    }

    const product = await Product.findById(id);
    const categoryss = await Category.findById(product.category);

    if (product.category != category) {
      if (!categoryss.products.includes(id)) {
        throw new ApolloError('this product yet', 400);
      }

      const index = await categoryss.products.indexOf(id);
      await categoryss.products.splice(index, 1);
      categoryss.productCount = categoryss.products.length;
      await categoryss.save();
    }
    // if (imageUrl) {
    //   product.imageUrl = imageUrl;
    // }

    product.name = name;
    product.content = content;
    product.price = price;

    product.category = category;
    product.imageUrl = imageUrl;

    await product.save();

    const user = await User.findById(userId)
      .populate({
        path: 'products',
        select: 'name content price imageUrl slug',
      })
      .populate({
        path: 'cart.product',
        select: 'name content price imageUrl slug',
      });

    res.results = {
      success: true,
      data: product,
      user: user,
    };
  }
);

// Delete Product
const deleteProduct = asyncHandler(async (id, res) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApolloError('There is not a product with this product id', 400);
  }

  const category = await Category.findById(product.category);
  category.products.splice(category.products.indexOf(id), 1);
  category.productCount = category.products.length;
  await category.save();

  const user = await User.findById(product.user);
  user.products.splice(user.products.indexOf(id), 1);
  user.productCount = user.products.length;
  await user.save();

  const user3 = await User.findById(product.user);

  if (user3.cart[0]) {
    var newPrice = 0;

    for (const product2 of user3.cart) {
      if (product2.product == id) {
        await user3.cart.splice(user3.products.indexOf(product2.product), 1);
        user3.cartCount = await (user3.cartCount - product2.quantity);
      } else {
        newPrice += product.price * product2.quantity;
      }
    }

    user3.cartTotalPrice = newPrice;

    await user3.save();
  }

  await Product.findByIdAndRemove(id);

  const user2 = await User.findById(product.user)
    .populate({
      path: 'products',
      select: 'name content price imageUrl slug',
    })
    .populate({
      path: 'cart.product',
      select: 'name content price imageUrl slug',
    });

  res.results = {
    success: true,
    message: 'Product deleted successfully',
    user: user2,
  };
});

// Get Single Product

module.exports = {
  addToProduct,
  likeProduct,
  undoLikeProduct,
  editProduct,
  deleteProduct,
};
