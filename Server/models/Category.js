const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
mongoose.Promise = global.Promise;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a category name'],
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  productCount: {
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
  imageUrl: {
    type: String,
  },
});

// Name Slug .For example kamilcan-celik
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
// Name Slug .For example kamilcan-celik
CategorySchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

// mongoose.models = {};

// const Category = mongoose.model("Category", CategorySchema);

// module.exports = Category;

module.exports =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);
