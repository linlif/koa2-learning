
const jwt = require('jsonwebtoken');

const { getUserInfo, createUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { userNameNotExit, registerFailInfo, userNameIsExit, loginFailInfo, changePasswordFailInfo } = require('../dataModel/ErrorModel');
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

    const token = jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: '1hours' });

    return new SuccessModel({ message: '登录成功', token })
}


/**
 * 判断是否登录
 * @param {Object} ctx 
 * @param {Function} next 
 * @returns 
 */
const checkLogin = async (ctx, next) => {
    // console.log('ctx===', ctx.state)

    // if (ctx.session && ctx.session.userInfo == null) {
    //     ctx.session.userInfo = userInfo
    // }

    return new SuccessModel({})
}


/**
 * 修改密码
 * @param {String} name 用户名
 * @param {String} password 旧密码
 * @param {String} newPassword 新密码
 * @returns 
 */
const changePassword = async (name, password, newPassword) => {
    let whereOpt = {}
    if (name) {
        whereOpt.name = name
    }

    if (password) {
        whereOpt.password = doCrypto(password)
    }

    try {
        // 调用service
        const res = await updateUser(
            whereOpt,
            {
                newPassword: doCrypto(newPassword)
            }
        )
        if (res == null) {
            return new ErrorModel({ ...changePasswordFailInfo, error: '密码错误' })
        }
        return new SuccessModel({ message: '密码修改成功！' })
    } catch (error) {
        console.log('changePassword---', error)
        return new ErrorModel({ ...changePasswordFailInfo, error: error.message })
    }
    return new SuccessModel({})
}

module.exports = {
    isUserExit,
    register,
    login,
    checkLogin,
    changePassword
};