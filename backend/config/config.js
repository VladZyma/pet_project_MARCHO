module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test',

  ACCESS_TOKEN_SECRET_WORD: process.env.ACCESS_TOKEN_SECRET_WORD,
  REFRESH_TOKEN_SECRET_WORD: process.env.REFRESH_TOKEN_SECRET_WORD,

  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
