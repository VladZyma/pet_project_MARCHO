const {oauthService} = require('../service');

const oauthController = {
  login: async (req, res, next) => {
    try {
      const userInfo = req.userInfo;
      const {password} = req.body;

      await oauthService.comparePasswords(password, userInfo.password);

      const tokensPair = oauthService.generateAccessTokens({id: userInfo._id});

      await oauthService.addAccessTokensToDB({_user_id: userInfo._id, ...tokensPair});

      res.status(200).json({name: userInfo.name, ...tokensPair});
    } catch (e) {
      next(e);
    }
  },
};

module.exports = oauthController;
