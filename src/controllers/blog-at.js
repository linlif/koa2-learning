/**
 * @description 微博at controller
 * @author Linlif
 */

const { getAtRelationCount, getAtUserBlogList } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel')
const { PAGE_SIZE } = require('../conf/constants')

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

/**
 * 获取at用户的微博列表
 * @param {Object} param0 用户Id及页码 { userId, currentPage }
 */
const getAtMeBlogList = async ({ userId, currentPage = 0, pageSize = PAGE_SIZE }) => {
    let curPage = currentPage > 0 ? currentPage - 1 : 0
    try {
        const { count, blogList } = await getAtUserBlogList({ userId, currentPage: curPage, pageSize })
        return new SuccessModel({
            isEmpty: blogList.length === 0,
            count,
            blogList,
            currentPage,
            pageSize
        })
    } catch (error) {
        console.log(error)
        return new ErrorModel({ errMsg: error })
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList
}