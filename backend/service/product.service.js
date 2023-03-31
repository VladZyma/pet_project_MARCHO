const {Product} = require('../dataBase');

const productService = {
  createProduct: async (productInfo) => {
    return Product.create(productInfo);
  },
  findAllProducts: async (filter = {}) => {
    return Product.find(filter);
  },
};


module.exports = productService;
