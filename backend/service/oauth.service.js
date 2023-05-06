const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../customError');
const {OAuth, ActionToken} = require('../dataBase');
const {config, tokenActionsEnum} = require('../config');

const oauthService = {
  hashPassword: async (password) => {
    return bcrypt.hash(password, 10);
  },
  comparePasswords: async (password, hashedPassword) => {
    const isPasswordsSame = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordsSame) {
      throw new ApiError('Wrong e-mail or password', 400);
    }
  },

  generateAccessTokens: (dataToSign) => {
    const accessToken = jwt.sign(dataToSign, config.ACCESS_TOKEN_SECRET_WORD, {expiresIn: '30m'});
    const refreshToken = jwt.sign(dataToSign, config.REFRESH_TOKEN_SECRET_WORD, {expiresIn: '60m'});

    return {
      accessToken,
      refreshToken,
    }
  },
  checkAccessToken: (token, tokenType) => {
    try {
      let secret = '';

      switch (tokenType) {
        case 'accessToken':
          secret = config.ACCESS_TOKEN_SECRET_WORD;
          break;
        case 'refreshToken':
          secret = config.REFRESH_TOKEN_SECRET_WORD;
          break;
      }

      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError('Access token has expired', 401);
    }
  },
  addAccessTokensToDB: async (tokenInfo) => {
    return OAuth.create(tokenInfo);
  },
  findAccessToken: async (tokenInfo) => {
    return OAuth.findOne(tokenInfo);
  },
  deleteAccessTokensById: async (tokenId) => {
    await OAuth.findByIdAndDelete(tokenId);
  },

  generateActionToken: (actionType, dataToSign) => {
    let secret = '';

    switch (actionType) {
      case tokenActionsEnum.FORGOT_PASSWORD:
        secret = config.FORGOT_PASSWORD_TOKEN_SECRET;
        break;
    }

    const actionToken = jwt.sign(dataToSign, secret, {expiresIn: '3h'});

    return actionToken;
  },
  checkActionToken: (token, actionType) => {
   try {
     let secret = '';

     switch (actionType) {
       case tokenActionsEnum.FORGOT_PASSWORD:
         secret = config.FORGOT_PASSWORD_TOKEN_SECRET;
         break;
     }

     return jwt.verify(token, secret);
   } catch (e) {
     return new ApiError('Wrong action token', 401);
   }
  },
  addActionTokenToDB: async (token) => {
    return ActionToken.create(token);
  },
  findActionToken: async (tokenInfo) => {
    return ActionToken.findOne(tokenInfo).lean();
  },
  deleteActionTokenById: async (tokenId) => {
    await ActionToken.findByIdAndDelete(tokenId);
  },

};

module.exports = oauthService;
