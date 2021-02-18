/**
 * @description 数据格式化
 * @author linlif
 */

const { DEFAULT_PIC } = require('../conf/constants')


/**
 * 用于替换用户默认头像
 * @param {Object} obj 数据 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PIC
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户数组或单个用户对象 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    // 多个对象
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}