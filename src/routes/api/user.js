const model = require('../../model');
const router = require('koa-router')()

const { isUserExit, register, login, checkLogin, changePassword, logout } = require('../../controllers/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

// 判断用户是否存在
router.post('/isExit', async (ctx, next) => {
    console.log(' ctx.request.body', ctx.request.query)
    const { name } = ctx.request.body
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
router.post('/checkLogin', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await checkLogin(ctx, userName, password)
});

// 修改密码
router.post('/changePassword', genValidator(userValidate), async (ctx, next) => {
    console.log('ctx.state', ctx.state)
    const { password, newPassword } = ctx.request.body,
        { name } = ctx.state.user;

    console.log('name===', name)

    ctx.body = await changePassword(name, password, newPassword)
});

// 推出登录
router.post('/logout', async (ctx, next) => {
    console.log('ctx.state', ctx.state)
    ctx.body = logout(ctx)
});

module.exports = router