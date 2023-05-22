const router = require('express').Router();

const {orderController} = require('../controller');
const {oauthMiddleware} = require('../middleware');

router.post(
  '/',
  oauthMiddleware.checkToken('accessToken'),
  orderController.addOrder,
);
router.get(
  '/',
  oauthMiddleware.checkToken('accessToken'),
  orderController.getOrders,
);

module.exports = router;