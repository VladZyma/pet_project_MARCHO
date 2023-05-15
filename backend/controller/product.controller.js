const {productService, s3Service} = require('../service');
const {productPresenter} = require('../presenter');
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
      const data = await productService.findAllProducts(req.query);

      data.products = productPresenter.normalizeAll(data.products);

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  uploadPhoto: async (req, res, next) => {
    try {
      const productId = req.productId;

      const uploadedData = await s3Service.uploadPublicFile(req.files.photo, 'product-images', productId);

      const productInfo = await productService.findUpdateProductById(productId, {photo: uploadedData.Location});

      res.status(201).json(productInfo);
    } catch (e) {
      next(e);
    }
  },
  getUserProducts: async (req, res, next) => {
    try {
      const productsIdArr = req.body;

      const products = await productService.findUserProductsById(productsIdArr);

      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  },
};



module.exports = productController;
