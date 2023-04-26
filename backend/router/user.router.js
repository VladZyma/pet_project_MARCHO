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
router.post(
    '/wishList/:userId',
    userMiddleware.isUserIdValid,
    userController.updateUserWishListById,
);
router.post(
    '/wishList/remove/:userId',
    userController.deleteProductFromUserWishListById,
);

module.exports = router;
