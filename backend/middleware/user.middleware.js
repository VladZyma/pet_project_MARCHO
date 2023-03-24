const {ApiError} = require('../customError');
const {userValidator} = require('../validator');
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
};

module.exports = userMiddleware;
