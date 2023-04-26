const {ApiError} = require('../customError');
const {userValidator, mongoIdValidator} = require('../validator');
const {userService} = require('../service');

const userMiddleware = {
  isNewUserBodyValid: async (req, res, next) => {
    try {
      const userBody = req.body;

      const validate = userValidator.newUserBodyValidator.validate(userBody);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.userInfo = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },
  isUpdatingUserBodyValid: async (req, res, next) => {
    try {
      const userBody = req.body;

      const validate = userValidator.updatingUserBodyValidator.validate(userBody);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      console.log('isUpdatingUserBodyValid:', validate.value);

      req.userNewInfo = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },
  isUserByEmailExists: async (req, res, next) => {
    try {
      const {email} = req.body;
      const user = await userService.findUserByEmail(email);

      if (user) {
        throw new ApiError(`User with email: ${email} already exists!!!`, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  isUserByIdExists: async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await userService.findUserById(userId);

      if (!user) {
        throw new ApiError('User not found!!!', 404);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  isUserIdValid: async (req, res, next) => {
    try {
      const {userId} = req.params;

      const validate = mongoIdValidator.validate(userId);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.userId = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },
};

module.exports = userMiddleware;
