const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const Category = require('./Category');
const User = require('./User');
mongoose.Promise = global.Promise;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a product name'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please enter a content'],
    minlength: [20, 'Please provide a content at least 20 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
  },
  imageUrl: [
    {
      type: String,
      required: [true, 'Please enter a image url'],
    },
  ],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
  },
  stockState: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    default: '',
  },
  star: {
    type: Number,
    default: 0,
  },
  starsToUser: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
      starPointToUser: { type: Number, default: 0 },
    },
  ],
  starCounter: {
    type: Number,
    default: 0,
  },
});

// Name Slug .For example kamilcan-celik
ProductSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
// Name Slug .For example kamilcan-celik
ProductSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

// Add product to category
ProductSchema.pre('save', async function (next) {
  if (!this.isModified('category')) {
    return next();
  }

  try {
    const category = await Category.findById(this.category);

    await category.products.push(this._id);
    category.productCount = await category.products.length;

    await category.save();

    return next();
  } catch (err) {
    return next(err);
  }
});

// Add product to user
ProductSchema.pre('save', async function (next) {
  if (!this.isModified('user')) {
    return next();
  }

  try {
    const user = await User.findById(this.user);

    await user.products.push(this._id);
    user.productCount = await user.products.length;

    await user.save();

    return next();
  } catch (err) {
    return next(err);
  }
});

// mongoose.models = {};

// const Product = mongoose.model("Product", ProductSchema);

// module.exports = Product;

module.exports =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
