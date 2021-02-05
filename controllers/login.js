const model = require('../model');

var jwt = require('jsonwebtoken');

const secretKey = 'jlkasf21lxd'

let { User } = model;

const loginController = async (ctx, next) => {
    console.log(' ctx.request.query', ctx)

    if (ctx.request.method == 'POST') {
        console.log(' ctx.request.body', ctx.request.body)
        const { id = null, password = null } = ctx.request.body;
        const users = await User.findAll({
            where: {
                id,
                password
            }
        });
        // console.log(`find ${users.length} user:`);
        // for (let p of users) {
        //     console.log(JSON.stringify(p));
        // }
        console.log('users:', JSON.stringify(users))

        if (users.length > 0) {
            var token = jwt.sign({ ...users[0].dataValues }, secretKey, { expiresIn: '1days' });
            console.log('token!~~', token)
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
        // console.log(' ctx.request.body', ctx.request.body)
        const { token } = ctx.request.body;

        // verify a token symmetric - synchronous
        try {
            const decoded = jwt.verify(token, secretKey);
            console.log('decoded~~~', decoded)

            if (decoded) {
                const { name, password } = decoded || {},
                    users = await User.findAll({
                        where: {
                            name,
                            password
                        }
                    });

                if (users[0].name === name && users[0].password === password) {
                    ctx.body = {
                        success: true,
                        data: decoded,
                        message: '用户已登录'
                    }
                } else {
                    ctx.body = {
                        success: false,
                        data: {
                            message: '登录失败'
                        }
                    }
                }
            }
        } catch (error) {
            console.log('error===', error)
            ctx.body = {
                success: false,
                data: {
                    message: error
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