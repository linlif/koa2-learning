const router = require('koa-router')()

const { isUserExit, register, login, checkLogin, changePassword, logout } = require('../../controllers/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

// 判断用户是否存在
router.get('/isExit', async (ctx, next) => {
    console.log(' ctx.request.query', ctx.request.query)
    const { name } = ctx.request.query
    ctx.body = await isUserExit(name)
});

// 用户注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    console.log(' ctx.request.body', ctx.request.query)
    const { userName, password, gender, nickName } = ctx.request.body
    ctx.body = await register({ userName, password, gender, nickName })
});

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
});

// 判断是否登录
router.get('/checkLogin', async (ctx, next) => {
    ctx.body = await checkLogin(ctx, next)
});

// 修改密码
router.post('/changePassword', genValidator(userValidate), async (ctx, next) => {
    // const { password, newPassword } = ctx.request.body;
    // // jwt获取用户信息的方式
    // const { name } = ctx.state.user;

    const { password, newPassword } = ctx.request.body;
    // koa-session2 + ioredis 获取用户信息的方式
    const { name } = ctx.session.userInfo;

    console.log('name===', name)

    ctx.body = await changePassword(name, password, newPassword)
});

// 推出登录
router.get('/logout', async (ctx, next) => {
    ctx.body = logout(ctx)
});

module.exports = router
