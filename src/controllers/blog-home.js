
/**
 * @description blog-home controller
 * @author Linlif
 */

const jwt = require('jsonwebtoken');

const { createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const {
    crateBlogFail
} = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp');
const { JWT_SECRET_KEY } = require('../conf/secretKeys');

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

module.exports = {
    create
};