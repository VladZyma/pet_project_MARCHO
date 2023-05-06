const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('node:path');

const {config} = require('../config');
const {ApiError} = require('../customError');
const emailTemplate = require('../emailTemplate');

const sendEmail = async (receiverEmail, emailAction, locals) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.NO_REPLY_EMAIL,
      pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
  });

  const templateInfo = emailTemplate[emailAction];

  if (!templateInfo) {
    throw new ApiError('Wrong email template', 400);
  }

  const emailCreator = new EmailTemplates({
    views: {
      root: path.join(process.cwd(), 'emailTemplate'),
    },
  });

  const html = await emailCreator.render(templateInfo.templateName, locals);

  transporter.sendMail({
    from: 'No reply',
    to: receiverEmail,
    subject: 'Welcome',
    html,
  });
};

module.exports = {sendEmail};
