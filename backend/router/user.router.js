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

module.exports = router;
