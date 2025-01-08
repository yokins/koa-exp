const Router = require('koa-router');
const AuthController = require('../controllers/auth.controller');

const router = new Router({
    prefix: '/api'
});

router.post('/login', AuthController.login);

module.exports = router;
