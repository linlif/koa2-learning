/**
 * @description 微博`@`用户关系
 * @author Linlif
 */

const { AtRelation } = require('../models')

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

module.exports = {
    createAtRelation,
    getAtRelationCount
}