const router = require('express').Router();

const {productController} = require('../controller');

router.post(
    '/',
    productController.addProduct,
);
router.get(
    '/',
    productController.getAllProducts,
);

module.exports = router;