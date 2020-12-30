const Koa = require('koa');
const jwt = require('koa-jwt');

const app = new Koa();

// 1. 错误信息处理
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.body = {
                code: 50001,
                message: '用户鉴权失败',
            };
        } else {
            throw err;
        }
    });
});

// 2. 中间件注册
app.use(jwt({ secret: JWT_SECRET }) // JWT_SECRET 是一个加密因子，可以任意设置，但尽量设置不容易被猜到的值。
    .unless({ path: [/^\/public/, /\/login/] })); // 排除public和login页面


// controller/UserController.js
const jwt = require('jsonwebtoken');

const login = async (ctx, next) => {
    // ...
    // 在登录成功后
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: '15d' });
    ctx.body = {
        code: 200,
        entry: {
            token: token
        },
    };
}