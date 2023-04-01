const {Product} = require('../dataBase');

const productService = {
  createProduct: async (productInfo) => {
    return Product.create(productInfo);
  },
  findAllProducts: async (filter = {}) => {
    return Product.find(filter).lean();
  },
  findProductById: async (productId) => {
    return Product.findById(productId).lean();
  },
  findUpdateProductById: async (productId, productInfo) => {
    return Product.findByIdAndUpdate(productId, productInfo, {new: true}).lean();
  },
};


module.exports = productService;
