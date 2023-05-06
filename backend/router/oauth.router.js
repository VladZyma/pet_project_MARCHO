const router = require ('express').Router();

const {oauthMiddleware} = require('../middleware');
const {oauthController} = require('../controller');
const {tokenActionsEnum} = require('../config');

router.post(
    '/login',
    oauthMiddleware.isUserByEmailExists,
    oauthController.login,
);
router.post(
    '/refresh',
    oauthMiddleware.checkToken('refreshToken'),
    oauthController.refresh,
);
router.post(
    '/logout',
    oauthMiddleware.checkToken('accessToken'),
    oauthController.logout,
);
router.post(
    '/password/forgot',
    oauthMiddleware.isUserByEmailExists,
    oauthController.forgotPassword,
);
router.put(
    '/password/forgot',
    oauthMiddleware.checkActionToken(tokenActionsEnum.FORGOT_PASSWORD),
    oauthController.setNewPassword,
);

module.exports = router;