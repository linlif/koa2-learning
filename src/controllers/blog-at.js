/**
 * @description 微博at controller
 * @author Linlif
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel')

/**
 * 获取At我的用户数量
 * @param {Number} userId 
 */
const getAtMeCount = async (userId) => {
    // 调用service
    try {
        const count = await getAtRelationCount(userId)
        return new SuccessModel({ count })
    } catch (error) {
        return new ErrorModel({ errMsg: error })
    }
}

module.exports = {
    getAtMeCount
}