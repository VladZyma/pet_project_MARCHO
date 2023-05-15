const router = require('express').Router();

const {userMiddleware} = require('../middleware');
const {userController} = require('../controller');

router.post(
    '/',
    userMiddleware.isNewUserBodyValid,
    userMiddleware.isUserByEmailExists,
    userController.registerNewUser,
);
router.get(
    '/',
    userController.getAllUsers,
);
router.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    userController.getUserById,
);
router.delete(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userController.deleteUserById,
);
router.post(
    '/wishList/:userId',
    userMiddleware.isUserIdValid,
    userController.updateUserProductById('wishlist'),
);
router.post(
    '/wishList/remove/:userId',
    userController.deleteUserProductById('wishlist'),
);
router.post(
  '/cart/:userId',
  userMiddleware.isUserIdValid,
  userController.updateUserProductById('cart'),
);
router.post(
  '/cart/remove/:userId',
  userController.deleteUserProductById('cart'),
);

module.exports = router;
