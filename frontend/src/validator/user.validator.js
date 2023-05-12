import Joi from 'joi';

import {userRegExp} from "../config";

const userValidator = {
  register: Joi.object({
    name: Joi.string().regex(userRegExp.NAME).required().messages({
      'string.pattern.base': 'Only letters and numbers, minimum 2 maximum 20 characters long!!!'
    }),
    email: Joi.string().regex(userRegExp.EMAIL).required().messages({
      'string.pattern.base': 'Please type your e-mail address in the format youremail@example.com'
    }),
    password: Joi.string().regex(userRegExp.PASSWORD).required().messages({
      'string.pattern.base': 'Your password needs to: include both lower and upper case characters, include at least one ' +
          ' number and one symbol (@$!%*?&), be at least 5 characters long!'
    }),
    terms: Joi.boolean().required().messages({
      'string.pattern.base': 'terms message'
    }),
  }),

  login: Joi.object({
    email: Joi.string().required().messages({
      'string.pattern.base': 'You must provide an E-mail!!!'
    }),
    password: Joi.string().required().messages({
      'string.pattern.base': 'You must provide a password!!!'
    }),
  }),

};

export {userValidator}
