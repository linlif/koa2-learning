const model = require('../model');
const router = require('koa-router')();
const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { userNameNotExit, registerFailInfo } = require('../dataModel/ErrorModel');
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
const register = ({ userName, password, gender }) => {
    const userInfo = getUserInfo(userName)
    if (userInfo) {
        return ErrorModel(userNameNotExit)
    } else {
        // 调用注册的service
        try {
            await createUser({
                userName,
                password: doCrypto(password),
                gender
            })
            return SuccessModel()
        } catch (error) {
            console.log('register---', error)
            return ErrorModel(registerFailInfo)
        }
    }
}

module.exports = {
    isUserExit,
    register
};