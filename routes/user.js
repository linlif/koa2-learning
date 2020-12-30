const model = require('../model');
const router = require('koa-router')()

let { User } = model;

// controller
const userInfoController = require('../controllers/user')
const { loginController, checkLoginController } = require('../controllers/login')

// 用户信息查询
router.get('/get', userInfoController);
router.post('/post', userInfoController);

// 登录
router.post('/login', loginController);
router.post('/checkLogin', checkLoginController);

module.exports = router
