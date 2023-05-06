const {emailActionEnum} = require('../config');

module.exports = {
  [emailActionEnum.WELCOME]: {
    subject: 'Welcome',
    templateName: 'welcome',
  },
  [emailActionEnum.FORGOT_PASSWORD]: {
    subject: 'Forgot password',
    templateName: 'forgotPassword',
  },
};
