/**
 * @description 登录校验中间件
 * @author Linlif
 */

const { ErrorModel } = require('../dataModel/ResModel')
const { loginCheckFailInfo } = require('../dataModel/ErrorModel')
const unless = require('koa-unless');

const loginCheck = async (ctx, next) => {
    if (ctx.session && ctx.session.userInfo) {
        // 已经登录
        await next()
        return
    }

    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

loginCheck.unless = unless

module.exports = {
    loginCheck
}