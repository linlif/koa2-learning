const model = require('../model');
const router = require('koa-router')();

let { User } = model;

const userInfoController = async (ctx, next) => {
    console.log(' ctx.request.query', ctx)

    if (ctx.request.method == 'GET') {
        const { id } = ctx.request.query;
        const users = await User.findAll({
            where: {
                id
            }
        });
        console.log(`find ${users.length} user:`);
        for (let p of users) {
            console.log(JSON.stringify(p));
        }
        ctx.body = {
            success: true,
            data: users
        }
    } else if (ctx.request.method == 'POST') {
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
        ctx.body = {
            success: true,
            data: users
        }
    }
}

module.exports = userInfoController;