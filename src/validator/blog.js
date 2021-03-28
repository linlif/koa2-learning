/**
 * @description blog Blog格式校验
 * @author linlif
 */


const validate = require('./_validate');

// 校验规则
const schema = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
            minLength: 10,
            //  maxLength: 2000
        },
        image: {
            type: 'string',
            minLength: 1,
            maxLength: 255
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
const blogValidate = (data = {}) => {
    return validate(schema, data)
}

module.exports = blogValidate