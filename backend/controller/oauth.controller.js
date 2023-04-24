const {oauthService} = require('../service');

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

};

module.exports = oauthController;
