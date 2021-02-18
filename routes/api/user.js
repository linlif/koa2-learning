const model = require('../../model');
const router = require('koa-router')()

let { User } = model;

// controller
const { isUserExit } = require('../../controllers/user')
const { loginController, checkLoginController } = require('../../controllers/login')


// 判断用户是否存在
router.post('/isExit', async (ctx, next) => {
    console.log(' ctx.request.body', ctx.request.query)
    const { name } = ctx.request.body
    ctx.body = await isUserExit(name)
});

// 登录
router.post('/login', loginController);
router.post('/checkLogin', checkLoginController);

module.exports = router
