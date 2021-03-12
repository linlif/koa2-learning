/**
 * 用户信息数据库服务
 * @description user service
 * @author linlif
 */

const { User } = require('../models');
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

async function updateUser({ name, password }, { newPassword, gender, birth, avatar }) {
    let whereOpt = {},
        updatedData = {};

    if (password && newPassword) {
        updatedData.password = newPassword
        whereOpt.password = password
    }

    if (name) {
        updatedData.name = name
        whereOpt.name = name
    }

    if (gender) {
        updatedData.gender = gender
    }

    if (birth) {
        updatedData.birth = birth
    }

    if (avatar) {
        updatedData.avatar = avatar
    }

    console.log('whereOpt===', whereOpt)
    const user = await User.findOne({
        attributes: ['id', 'name', 'gender', 'birth', 'avatar'],
        where: whereOpt
    })

    // 找不到用户，直接返回null
    if (user == null) {
        return user
    }

    // 修改password并保存到数据库
    user.password = newPassword
    const tt = await user.save()

    return tt.dataValues
}

module.exports = {
    getUserInfo,
    createUser,
    updateUser
}