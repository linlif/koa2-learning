
const jwt = require('jsonwebtoken');

const { getUserInfo, createUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const {
    userNameNotExit,
    registerFailInfo,
    userNameIsExit,
    loginFailInfo,
    changePasswordFailInfo
} = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp');
const { addFollower } = require('../services/user-relation')

/**
 * 判断用户名是否存在
 * @param {String} name 用户名
 */
const isUserExit = async (name) => {
    const userData = await getUserInfo(name)
    if (userData) {
        return new SuccessModel({ message: '用户名已存在' })
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
            const userData = await createUser({
                userName,
                password: doCrypto(password),
                gender
            })

            // 自己关注自己，方便首页查询关注人微博数据（关注了自己，所以自己的微博也会出现在关注人的微博列表中）
            await addFollower(userData.id, userData.id)

            return new SuccessModel({ message: '注册成功！', data: userData })
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
        return new ErrorModel({ ...loginFailInfo, error: '账号或密码错误！' })
    }

    // const token = jwt.sign({ ...userInfo }, JWT_SECRET_KEY, { expiresIn: 60 * 60 }); // 数字表示秒（120 is equal to 120s），字符串的数字表示毫秒（"120" is equal to "120ms"）

    if (ctx.session && ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    console.log('ctx.session', ctx.session)
    return new SuccessModel({ message: '登录成功' })
}


/**
 * 判断是否登录
 * @param {Object} ctx 
 * @param {Function} next 
 * @returns 
 */
const checkLogin = async (ctx, next) => {
    console.log('ctx.state===', ctx.session)
    if (ctx.session && ctx.session.userInfo) {
        return new SuccessModel({ message: '已登录', data: ctx.session.userInfo })
    }
}


/**
 * 修改密码
 * @param {String} name 用户名
 * @param {String} password 旧密码
 * @param {String} newPassword 新密码
 * @returns 
 */
const changePassword = async (name, password, newPassword) => {
    if (password == newPassword) {
        return new ErrorModel({ ...changePasswordFailInfo, error: '新旧密码不能一致！' })
    }

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
            return new ErrorModel({ ...changePasswordFailInfo, error: '旧密码错误！' })
        }
        console.log('updateUser==res---', res)
        return new SuccessModel({ message: '密码修改成功！' })
    } catch (error) {
        console.log('changePassword---', error)
        return new ErrorModel({ ...changePasswordFailInfo, error: error.message })
    }
}


const logout = (ctx) => {
    delete ctx.session.userInfo
    return new SuccessModel({ message: '已退出登录！' })
}

module.exports = {
    isUserExit,
    register,
    login,
    checkLogin,
    changePassword,
    logout
};