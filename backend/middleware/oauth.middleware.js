const {userService, oauthService} = require('../service');
const {ApiError} = require("../customError");

const oauthMiddleware = {
  isUserByEmailExists: async (req, res, next) => {
    try {
      const {email} = req.body;

      const user = await userService.findUserByEmail(email);

      if (!user) {
        throw new ApiError('Your authentication information is incorrect!!!', 401);
      }

      req.userInfo = user;
      next();
    } catch (e) {
      next(e)
    }
  },
  checkToken: (tokenType) => async (req, res, next) => {
    try {
      let token = req.get('Authorization');

      if (tokenType === 'refreshToken') {
        token = req.body.refreshToken;
      }

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
  checkActionToken: (actionType) => async (req, res, next) => {
    try {
      const actionToken = req.get('Authorization');

      if(!actionToken) {
        throw new ApiError('No action token', 404);
      }

      oauthService.checkActionToken(actionToken, actionType);

      const actionTokenInfo = await oauthService.findActionToken({actionToken});

      if (!actionTokenInfo) {
        throw new ApiError('Wrong action token', 401);
      }

      req.actionTokenInfo = actionTokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  },
};

module.exports = oauthMiddleware;
