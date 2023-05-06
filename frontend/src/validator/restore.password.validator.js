import Joi from 'joi';

import {userRegExp} from "../config";

const restorePasswordValidator = Joi.object({
  newPassword: Joi.string().regex(userRegExp.PASSWORD).required().messages({
    'string.pattern.base': 'Your password needs to: include both lower and upper case characters, include at least one ' +
        ' number and one symbol (@$!%*?&), be at least 5 characters long!'
  }),
  confirmedPassword: Joi.string().regex(userRegExp.PASSWORD).required().messages({
    'string.pattern.base': 'Your password needs to: include both lower and upper case characters, include at least one ' +
        ' number and one symbol (@$!%*?&), be at least 5 characters long!'
  }),
});

export {restorePasswordValidator}
