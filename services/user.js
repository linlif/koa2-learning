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

    console.log('res666', res)
    return formatUser(res.dataValues)
}

module.exports = {
    getUserInfo
}