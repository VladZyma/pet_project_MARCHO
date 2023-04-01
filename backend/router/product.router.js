const router = require('express').Router();

const {productMiddleware, fileMiddleware} = require('../middleware');
const {productController} = require('../controller');

router.post(
    '/',
    productController.addProduct,
);
router.get(
    '/',
    productController.getAllProducts,
);
router.patch(
    '/:productId/photo',
    productMiddleware.isProductIdValid,
    fileMiddleware.checkUploadImage,
    productController.uploadPhoto,

);

module.exports = router;