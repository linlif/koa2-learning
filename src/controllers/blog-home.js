
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
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constants')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 * 创建接口
 * @param {Object} param0 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
    // 分析并收集content中的@用户 格式如：哈喽 @李四 - lisi 你好 @张三 - zhangsan
    const atUserNameList = []

    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr // 不做替换，这里只为了提取用户名
        }
    )

    // 根据 @ 用户查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // 提取用户的id
    const atUserIdList = atUserList.map(user => user.id)

    // 调service
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content,
            image
        })

        // 创建@关系
        await Promise.all(atUserIdList.map(userId => {
            return createAtRelation({
                blogId: blog.id,
                userId
            })
        }))

        return new SuccessModel({ message: '创建成功！', data: blog })
    } catch (ex) {
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