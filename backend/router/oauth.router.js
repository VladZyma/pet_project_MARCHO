const router = require ('express').Router();

const {oauthMiddleware} = require('../middleware');
const {oauthController} = require('../controller');

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

module.exports = router;