const {userService, oauthService} = require('../service');
const {ApiError} = require('../customError');
const {userNameNormalizer} = require('../helper');

const userController = {
  registerNewUser: async (req, res, next) => {
    try {
      let userInfo = req.userInfo;

      const userName = userNameNormalizer(userInfo.name);
      const hashedPassword = await oauthService.hashPassword(userInfo.password);

      userInfo = {...userInfo, name: userName, password: hashedPassword};

      const user = await userService.register(userInfo);

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

      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = userController;