const {productService, s3Service} = require('../service');
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
      const products = await productService.findAllProducts(req.query);

      res.status(200).json(products);
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
};



module.exports = productController;
