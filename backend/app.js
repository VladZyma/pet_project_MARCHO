const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const {config} = require('./config');
const {userRouter, oauthRouter, productRouter} = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.use('/users', userRouter);
app.use('/auth', oauthRouter);
app.use('/products', productRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    status: error.status,
  });
});

app.listen(config.PORT, async () => {
  try {
    console.log(`LISTENING PORT: ${config.PORT}`);
    // await mongoose.connect(`${config.MONGO_DB_URI}/marcho`);
    await mongoose.connect(`${config.MONGO_DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (e) {
    console.log(e);
  }
});