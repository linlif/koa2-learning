
/**
 * @description blog-home controller
 * @author Linlif
 */

const jwt = require('jsonwebtoken');

const { createBlog, getFollowerBlogList } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const {
    crateBlogFail
} = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp');
const { JWT_SECRET_KEY } = require('../conf/secretKeys');
const { PAGE_SIZE } = require('../conf/constants')

/**
 * 创建接口
 * @param {Object} param0 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
    // 调service
    try {
        const blog = await createBlog({
            userId,
            content,
            image
        })

        return new SuccessModel({ message: '创建成功！', data: blog })
    } catch (ex) {
        console.log('createBlog---', ex.message, ex.stack)
        return new ErrorModel({ ...crateBlogFail, error: error.message })
    }
}

/**
 * 获取首页微博列表
 * @param {Object} param0 用户id及分页参数 { userId, currentPage }
 */
const getHomeBlogList = async ({ userId, currentPage, pageSize = PAGE_SIZE }) => {
    // 调用service
    try {
        const result = await getFollowerBlogList({
            userId,
            currentPage: currentPage > 0 ? currentPage - 1 : 0,
            pageSize
        })
        const { count, blogList = [] } = result || {};

        return new SuccessModel({
            currentPage,
            pageSize: PAGE_SIZE,
            count,
            isEmpty: blogList.length === 0,
            data: blogList
        })
    } catch (error) {
        return new ErrorModel({ error: error.message })
    }
}

module.exports = {
    create,
    getHomeBlogList
};