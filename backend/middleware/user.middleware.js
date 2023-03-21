const {ApiError} = require('../customError');
const {userValidator} = require('../validator');

const userMiddleware = {
    isNewUserBodyValid: async (req, res, next) => {
        try {
            const userBody = req.body;

            const validate = userValidator.newUserBodyValidator.validate(userBody);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.userInfo = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
};

module.exports = userMiddleware;
