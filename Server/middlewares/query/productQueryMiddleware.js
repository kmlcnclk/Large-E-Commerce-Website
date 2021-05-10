const asyncHandler = require('express-async-handler');
const {
  searchHelper,
  populateHelper,
  productSortHelper,
  paginationHelper,
} = require('./queryMiddlewareHelpers');
const Category = require('Server/models/Category');

// Product Query Middleware
const productQueryMiddleware = asyncHandler(async function (
  res,
  req,
  model,
  options,
  slug,
  pageIndex
) {
  let query;
  if (slug) {
    const category = await Category.findOne({ slug });

    query = model.find({ category: category._id });
  } else {
    query = model.find();
  }
  // query = searchHelper("name", query, req);

  if (options && options.population) {
    query = populateHelper(query, options.population);
  }

  query = productSortHelper(query, req);

  const total = await model.countDocuments();
  const paginationResult = await paginationHelper(pageIndex, total, query, req);

  query = paginationResult.query;
  const pagination = paginationResult.pagination;

  const queryResults = await query;

  res.queryResults = {
    success: true,
    count: queryResults.length,
    pagination: pagination,
    data: queryResults,
  };
});

module.exports = productQueryMiddleware;
