const {userService, oauthService} = require('../service');
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
  checkToken: (tokenType) => async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      if (!token) {
        throw new ApiError('No access token', 401);
      }

      oauthService.checkAccessToken(token, tokenType);

      const tokenInfo = await oauthService.findAccessToken({[tokenType]: token});

      if (!tokenInfo) {
        throw new ApiError('Wrong access token', 401);
      }

      req.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  },
};

module.exports = oauthMiddleware;
