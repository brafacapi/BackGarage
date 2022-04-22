const router = require('express').Router();
const controller = require('./controller');

router.post('/login', controller.login);
router.post('/token', controller.refreshTokens);
router.get('/me', controller.me);

module.exports = router;
