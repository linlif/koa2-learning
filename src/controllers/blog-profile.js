
/**
 * @description blog-profile controller
 * @author Linlif
 */

const { getBlogByUser } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { queryBlogFail } = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp');
const { JWT_SECRET_KEY } = require('../conf/secretKeys');
const { PAGE_SIZE } = require('../conf/constants')
/**
 * 获取个人主页微博列表
 * @param {Object} param0 { userName, pageSize, currentPage }
 */
const getBlogProfileList = async ({ userName, pageSize = PAGE_SIZE, currentPage = 0 }) => {

    let curPage = currentPage > 0 ? currentPage - 1 : 0

    // 调service
    try {
        const result = await getBlogByUser({
            userName,
            pageSize,
            currentPage: curPage
        })

        const blogList = result.blogList

        return new SuccessModel({
            data: {
                isEmpty: blogList.length === 0,
                blogList,
                pageSize,
                currentPage,
                count: result.count
            }
        })
    } catch (ex) {
        console.log('createBlog---', ex.message, ex.stack)
        return new ErrorModel({ ...queryBlogFail, error: ex.message })
    }
}

module.exports = {
    getBlogProfileList
};