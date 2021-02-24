/**
 * @description res 数据模型
 * @author linlif 
 */

/**
 * 基础模块
 */
class BaseModel {
    constructor({ errno, data, message, ...rest }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
        if (rest) {
            Object.keys(rest).forEach(k => {
                this[k] = rest[k]
            })
        }
    }
}


/**
 * 成功的模块
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的模块
 */
class ErrorModel extends BaseModel {
    constructor({ errno, message, ...rest }) {
        super({
            errno,
            message,
            ...rest
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}