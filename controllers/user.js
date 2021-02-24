const model = require('../model');
const router = require('koa-router')();
const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { userNameNotExit, registerFailInfo, userNameIsExit } = require('../dataModel/ErrorModel');
const doCrypto = require('../utils/cryp')

let { User } = model;

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
    console.log('userInfo~~~', userInfo)
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

            console.log('createUser--res', res)
            return new SuccessModel({ message: '注册成功！' })
        } catch (error) {
            console.log('register---', error)
            return new ErrorModel({ ...registerFailInfo, error: error.message })
        }
    }
}

module.exports = {
    isUserExit,
    register
};