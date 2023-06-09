const router = require('express').Router();

const {productMiddleware, fileMiddleware, oauthMiddleware} = require('../middleware');
const {productController} = require('../controller');

router.post(
    '/',
    productController.addProduct,
);
router.get(
    '/',
    oauthMiddleware.checkToken('accessToken'),
    productController.getAllProducts,
);
router.post(
    '/wishlist',
    oauthMiddleware.checkToken('accessToken'),
    productController.getUserProducts,
);
router.post(
    '/cart',
    oauthMiddleware.checkToken('accessToken'),
    productController.getUserProducts,
);
router.get(
    '/promo',
    productController.getAllProducts,
);
router.put(
  '/:productId',
  productMiddleware.isProductIdValid,
  productController.updateProductById,
);
router.patch(
    '/:productId/photo',
    productMiddleware.isProductIdValid,
    fileMiddleware.checkUploadImage,
    productController.uploadPhoto,
);
router.delete(
  '/:productId',
  productMiddleware.isProductIdValid,
  productController.deleteProductById,
);

module.exports = router;