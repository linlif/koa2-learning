/**
 * Blog数据库服务
 * @description blog service
 * @author linlif
 */

const { Blog, User } = require('../models');
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

/**
 * 根据用户名获取微博列表
 * @param {Object} param0 { userName, currentPage, pageSize }
 */
const getBlogByUser = async ({ userName, currentPage, pageSize }) => {
    // 查询条件
    const userWhereOpts = {}

    if (userName) {
        userWhereOpts.name = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: currentPage * pageSize,
        order: [
            ['id', 'DESC'] // 根据id倒序排列
        ],
        include: {// 连表查询，记得先建立Blog和User表的关联
            model: User,
            as: 'user',
            attributes: ['name', 'avatar', 'gender'],
            where: userWhereOpts
        }
    })

    // result.count 总数
    // result.rows 查询结果，数组
    let blogList = result.rows.map(row => row.dataValues)
    blogList.map(blogItem => {
        console.log('blogItem====', blogItem)
        const user = blogItem.user.dataValues
        blogItem.user = user
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogByUser
}