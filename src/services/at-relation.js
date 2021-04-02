/**
 * @description 微博`@`用户关系
 * @author Linlif
 */

const { AtRelation } = require('../models')

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

module.exports = {
    createAtRelation
}