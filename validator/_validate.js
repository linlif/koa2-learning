/**
 * @description json schema 校验
 * @author linlif
 */

const Ajv = require('ajv').default
const ajv = new Ajv()


/**
 * json schema 校验
 * @param {Object} schema 数据的校验规则
 * @param {Object} data 待校验的数据
 */
const validate = (schema, data = {}) => {
    const validate = ajv.compile(schema, data)
    const valid = validate(data)
    if (!valid) {
        return validate.errors[0]
    }
}

module.exports = validate