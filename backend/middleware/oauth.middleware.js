const {userService} = require('../service');
const {ApiError} = require("../customError");

const oauthMiddleware = {
  isUserByEmailExists: async (req, res, next) => {
    try {
      const {email} = req.body;

      const user = await userService.findUserByEmail(email);

      if (!user) {
        throw new ApiError('Wrong e-mail or password!!!', 404);
      }

      req.userInfo = user;
      next();
    } catch (e) {
      next(e)
    }
  },
};

module.exports = oauthMiddleware;
