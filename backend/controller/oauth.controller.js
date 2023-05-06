const {oauthService, emailService, userService} = require('../service');
const {tokenActionsEnum,emailActionEnum ,config} = require('../config');

const oauthController = {
  login: async (req, res, next) => {
    try {
      const userInfo = req.userInfo;
      const {password} = req.body;

      await oauthService.comparePasswords(password, userInfo.password);

      const tokensPair = oauthService.generateAccessTokens({id: userInfo._id});

      await oauthService.addAccessTokensToDB({_user_id: userInfo._id, ...tokensPair});

      res.status(200).json({userId: userInfo._id, name: userInfo.name, ...tokensPair});
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const tokenInfo = req.tokenInfo;

      const tokenPair = oauthService.generateAccessTokens({id: tokenInfo._user_id});

      await Promise.all([
          oauthService.deleteAccessTokensById(tokenInfo._id),
          oauthService.addAccessTokensToDB({_user_id: tokenInfo._user_id, ...tokenPair}),
      ]);

      res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const tokenInfo = req.tokenInfo;

      await oauthService.deleteAccessTokensById(tokenInfo._id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const userInfo = req.userInfo;

      const actionToken = oauthService.generateActionToken(tokenActionsEnum.FORGOT_PASSWORD, {email: userInfo.email});

      const forgotPassUrl = `${config.FRONTEND_URL}/password/new?token=${actionToken}`;

      await Promise.allSettled([
          oauthService.addActionTokenToDB({_user_id: userInfo._id, tokenType: tokenActionsEnum.FORGOT_PASSWORD, actionToken}),
          emailService.sendEmail(userInfo.email, emailActionEnum.FORGOT_PASSWORD, {url: forgotPassUrl, userName: userInfo.name}),
      ]);

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  },
  setNewPassword: async (req, res, next) => {
    try {
      const actionTokenInfo = req.actionTokenInfo;
      const {newPassword} = req.body;

      const hashedPassword = await oauthService.hashPassword(newPassword);

      const [updatedUser] = await Promise.allSettled([
        oauthService.deleteActionTokenById(actionTokenInfo._id),
        userService.findUpdateUserById(actionTokenInfo._user_id, {password: hashedPassword}),
      ]);

      res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },

};

module.exports = oauthController;
