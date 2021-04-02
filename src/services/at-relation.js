/**
 * @description 微博`@`用户关系
 * @author Linlif
 */

const { AtRelation, User, Blog } = require('../models')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建At关系
 * @param {Object} param0 用户id和blogId { userId, blogId }
 * @returns 
 */
const createAtRelation = async ({ userId, blogId }) => {
    const result = await AtRelation.create({
        userId,
        blogId
    })

    if (result == null) {
        return res
    }

    return result.dataValues
}

/**
 * 获取At用户的微博数（未读的）
 * @param {Number} userId 用户Id
 */
const getAtRelationCount = async (userId) => {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}

/**
 * 获取At用户微博列表
 * @param {Object} param0 用户id和分页参数 { userId, currentPage, pageSize }
 */
const getAtUserBlogList = async ({ userId, currentPage, pageSize }) => {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: currentPage * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            // @关系
            {
                model: AtRelation,
                attributes: ['blogId', 'userId'],
                where: {
                    userId
                }
            },
            // 用户信息
            {
                model: User,
                as: 'user',
                attributes: ['name', 'gender', 'avatar']
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        delete blogItem.AtRelations
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })



    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}