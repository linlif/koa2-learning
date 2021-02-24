
const jwt = require('jsonwebtoken');

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { userNameNotExit, registerFailInfo, userNameIsExit, loginFailInfo } = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp');
const { JWT_SECRET_KEY } = require('../conf/secretKeys');


/**
 * 判断用户名是否存在
 * @param {String} name 用户名
 */
const isUserExit = async (name) => {
    const userData = await getUserInfo(name)
    if (userData) {
        console.log('userData~~~~', new SuccessModel(userData))
        return new SuccessModel(userData)
    }

    return new ErrorModel(userNameNotExit)
}

/**
 * 用户注册接口
 * @param {String} userName 用户名 
 * @param {String} 密码 
 * @param {String} 性别 (1、男，2、女， 3、保密)
 */
const register = async ({ userName, password, gender }) => {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(userNameIsExit)
    } else {
        // 调用注册的service
        try {
            const res = await createUser({
                userName,
                password: doCrypto(password),
                gender
            })

            return new SuccessModel({ message: '注册成功！' })
        } catch (error) {
            console.log('register---', error)
            return new ErrorModel({ ...registerFailInfo, error: error.message })
        }
    }
}

/**
 * 用户登录
 * @param {Object} ctx koa2上下文
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
const login = async (ctx, userName, password) => {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    console.log('userInfo~~', userInfo)
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // if (ctx.session.userInfo == null) {
    //     ctx.session.userInfo = userInfo
    // }

    const token = jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: '1days' });

    return new SuccessModel({ message: '登录成功', token })
}

module.exports = {
    isUserExit,
    register,
    login
};