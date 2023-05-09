const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const {config} = require('./config');
const {userRouter, oauthRouter, productRouter} = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/users', userRouter);
app.use('/auth', oauthRouter);
app.use('/products', productRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    status: error.status,
  });
});

const start = async () => {
  try {
    let connecting = false;

      while(!connecting) {
        console.log('Connecting to database.....');
        try {
          await mongoose.connect(`${config.MONGO_DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});
          connecting = true;
          console.log('Database available');
        } catch (e) {
          console.log('Database unavailable, wait 3sec');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    await app.listen(config.PORT, process.env.HOST);
    console.log(`LISTENING PORT: ${config.PORT}`);
  } catch (e) {
    console.log(e);
  }
};
start();