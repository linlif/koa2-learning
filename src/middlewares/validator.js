/**
 * @description json schema 校验中间件
 * @author linlif
 */

const { ErrorModel } = require("../dataModel/ResModel")
const { jsonSchemaFailInfo } = require('../dataModel/ErrorModel')

/**
 * 
 * @param {Function} validateFn 验证函数
 */
const genValidator = (validateFn = () => { }) => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body
        const error = validateFn(data)

        // 验证失败
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFailInfo)
            return
        }

        // 验证成功
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}