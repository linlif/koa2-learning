/**
 * @description 数据格式化
 * @author linlif
 */

const { DEFAULT_PIC, REG_FOR_AT_WHO } = require('../conf/constants')


/**
 * 用于替换用户默认头像
 * @param {Object} obj 数据 
 */
function _formatUserPicture(obj) {
    if (obj.avatar == null) {
        obj.avatar = DEFAULT_PIC
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

/**
 * 格式化微博内容
 * @param {Object} list 
 * @returns 
 */
function _formatContent(obj) {
    obj.formatContent = obj.content

    // 格式化 @
    // 例如： `哈喽 @张三 你好！` ---> `哈喽 <a href="/profile/zhangsan">张三</a> 你好`
    obj.formatContent = obj.formatContent.replace(REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">${nickName}</a>`
        }
    )

    return obj
}

/**
 * 格式化单条微博或微博列表
 * @param {Array|Object} list 
 * @returns 
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        return list.map(_formatContent)
    }

    return _formatContent(list)
}

module.exports = {
    formatUser,
    formatBlog
}