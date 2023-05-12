const {userService, oauthService, emailService} = require('../service');
const {ApiError} = require('../customError');
const {userNameNormalizer} = require('../helper');
const {userPresenter} = require('../presenter');
const {emailActionEnum} = require('../config');

const userController = {
  registerNewUser: async (req, res, next) => {
    try {
      let userInfo = req.userInfo;

      const userName = userNameNormalizer(userInfo.name);
      const hashedPassword = await oauthService.hashPassword(userInfo.password);

      userInfo = {...userInfo, name: userName, password: hashedPassword, wishlist: []};

      const [user] = await Promise.allSettled([
        userService.register(userInfo),
        emailService.sendEmail(userInfo.email, emailActionEnum.WELCOME, {
          userName: userInfo.name,
          userPassword: req.userInfo.password
        }),
      ]);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findAllUsers();

      if (users.length < 1) {
        throw new ApiError('Users not found!!!', 404);
      }

      const usersInfo = userPresenter.normalizeAll(users);

      res.status(200).json(usersInfo);
    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await userService.findUserById(userId);

      if (!user) {
        throw new ApiError('User not found!!!', 404);
      }

      const userInfo = userPresenter.normalize(user);

      res.status(200).json(userInfo);
    } catch (e) {
      next(e);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const user = req.user;

      await userService.findDeleteUserById(user._id);

      res.status(204).json();
    } catch (e) {
      next(e);
    }
  },
  updateUserWishListById: async (req, res, next) => {
    try {
      const userId = req.userId;
      const {productId} = req.body;

      const updatedUser = await userService.findUpdateUserWishListById(userId, productId);

      if (!updatedUser) {
        throw new ApiError('User not found!!!', 404);
      }

      res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
  deleteProductFromUserWishListById: async (req, res, next) => {
    try {
      const {userId} = req.params;
      const {productId} = req.body;

      const userInfo = await userService.findDeleteProductFromUserWishListById(userId, productId);

      res.status(200).json(userInfo);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = userController;