const Joi = require('joi');

const {userRegExp} = require('../config');

module.exports = {
    newUserBodyValidator: Joi.object({
        name: Joi.string().regex(userRegExp.NAME).required(),
        email: Joi.string().regex(userRegExp.EMAIL).required(),
        password: Joi.string().regex(userRegExp.PASSWORD).required(),
    }),
    updatingUserBodyValidator: Joi.object({
        name: Joi.string().regex(userRegExp.NAME).optional(),
        email: Joi.string().regex(userRegExp.EMAIL).optional(),
    }),
};
