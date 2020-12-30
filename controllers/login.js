const model = require('../model');

var jwt = require('jsonwebtoken');

const secretKey = 'jlkasf21lxd'

let { User } = model;

const loginController = async (ctx, next) => {
    console.log(' ctx.request.query', ctx)

    if (ctx.request.method == 'POST') {
        console.log(' ctx.request.body', ctx.request.body)
        const { id } = ctx.request.body;
        const users = await User.findAll({
            where: {
                id
            }
        });
        console.log(`find ${users.length} user:`);
        for (let p of users) {
            console.log(JSON.stringify(p));
        }

        var token = jwt.sign(JSON.stringify(users[0]), secretKey);

        console.log('token!~~', token)

        if (users.length > 0) {
            ctx.body = {
                success: true,
                data: token
            }
        } else {
            ctx.body = {
                success: false,
                data: {
                    message: '登录失败'
                }
            }
        }
    } else {
        ctx.body = {
            success: false,
            data: {
                message: '仅支持post请求'
            }
        }
    }
}

const checkLoginController = async (ctx, next) => {
    console.log(' ctx.request.query', ctx)

    if (ctx.request.method == 'POST') {
        console.log(' ctx.request.body', ctx.request.body)
        const { token } = ctx.request.body;

        // verify a token symmetric - synchronous
        var decoded = jwt.verify(token, secretKey);
        console.log(decoded.id)

        if (decoded.id > 0) {
            ctx.body = {
                success: true,
                data: decoded
            }
        } else {
            ctx.body = {
                success: false,
                data: {
                    message: '登录失败'
                }
            }
        }
    } else {
        ctx.body = {
            success: false,
            data: {
                message: '仅支持post请求'
            }
        }
    }
}

module.exports = {
    loginController,
    checkLoginController
};