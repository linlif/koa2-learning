const model = require('../model');
const router = require('koa-router')();
const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { userNameNotExit } = require('../dataModel/ErrorModel');

let { User } = model;

const isUserExit = async (name) => {
    const userData = await getUserInfo(name)
    if (userData) {
        console.log('userData~~~~', new SuccessModel(userData))
        return new SuccessModel(userData)
    }

    return new ErrorModel(userNameNotExit)
}

module.exports = {
    isUserExit
};