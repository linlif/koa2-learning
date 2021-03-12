/**
 * Blog数据库服务
 * @description blog service
 * @author linlif
 */

const { Blog } = require('../models');
const { formatUser } = require('./_format');


/**
* 创建Blog
* @param {String} param0 { userId, content, image } 
*/
const createBlog = async ({ userId, content, image }) => {
    const result = await Blog.create({
        userId,
        content,
        image
    })

    if (result == null) {
        return res
    }

    return result.dataValues
}

module.exports = {
    createBlog
}