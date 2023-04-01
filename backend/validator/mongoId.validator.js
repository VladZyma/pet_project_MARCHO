const Joi = require('joi');

const {mongoIdRegExp} = require('../config');

module.exports = Joi.string().regex(mongoIdRegExp.MONGO_ID);
