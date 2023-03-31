const {productService} = require('../service');
const {ApiError} = require('../customError');

const productController = {
  addProduct: async (req, res, next) => {
    try {
      const productInfo = req.body;

      const product = await productService.createProduct(productInfo);

      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const products = await productService.findAllProducts();

      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = productController;
