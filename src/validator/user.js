/**
 * @description user 用户格式校验
 * @author linlif
 */


const validate = require('./_validate');

// 校验规则
const schema = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            minLength: 2,
            maxLength: 8
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 1
        },
        birth: {
            type: 'string'
        },
        password: {
            type: 'string',
        },
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
const userValidate = (data = {}) => {
    return validate(schema, data)
}

module.exports = userValidate