module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test',

  ACCESS_TOKEN_SECRET_WORD: process.env.ACCESS_TOKEN_SECRET_WORD,
  REFRESH_TOKEN_SECRET_WORD: process.env.REFRESH_TOKEN_SECRET_WORD,
};
