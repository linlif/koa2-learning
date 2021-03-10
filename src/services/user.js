/**
 * 用户信息数据库服务
 * @description user service
 * @author linlif
 */

const { User } = require('../model');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {String} userName 
 * @param {String} password 
 */
async function getUserInfo(name, password) {
    // 查询条件
    let whereOpt = {
        name
    }

    if (password) {
        whereOpt.password = password
    }

    const res = await User.findOne({
        attributes: ['id', 'name', 'gender', 'birth'],
        where: whereOpt
    })

    if (res == null) {
        return res
    }

    return formatUser(res.dataValues)
}

/**
 * 创建用户
 * @param {String} userName 用户名 
 * @param {String} password 密码 
 * @param {String} gender 性别 (1、男，2、女， 3、保密)
 * @param {String} nickName 昵称
 */
const createUser = ({ userName, password, gender = 3, nickName }) => {
    console.log('password', password)
    const result = User.create({
        name: userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })

    if (result == null) {
        return res
    }

    return result
}

async function updateUser({ name, password }, { newPassword }) {
    // 查询条件
    let whereOpt = {
        name,
        password
    }

    console.log('whereOpt===', whereOpt)
    const user = await User.findOne({
        attributes: ['id', 'name', 'gender', 'birth'],
        where: whereOpt
    })

    if (user == null) {
        return user
    }

    user.password = password
    const tt = await user.update({ password, where: { name } })

    console.log('userult==', tt)

    return user
}

module.exports = {
    getUserInfo,
    createUser,
    updateUser
}