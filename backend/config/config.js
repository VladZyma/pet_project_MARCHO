module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  ACCESS_TOKEN_SECRET_WORD: process.env.ACCESS_TOKEN_SECRET_WORD,
  REFRESH_TOKEN_SECRET_WORD: process.env.REFRESH_TOKEN_SECRET_WORD,
  FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET,

  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
