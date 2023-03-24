const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../customError');
const {OAuth} = require('../dataBase');
const {config} = require('../config');

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
    const accessToken = jwt.sign(dataToSign, config.ACCESS_TOKEN_SECRET_WORD, {expiresIn: '10m'});
    const refreshToken = jwt.sign(dataToSign, config.REFRESH_TOKEN_SECRET_WORD, {expiresIn: '20m'});

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
};

module.exports = oauthService;
