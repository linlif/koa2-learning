/**
 * @description 用户关系service
 * @author Linlif
 */

const { User, UserRelation } = require('../model')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即用户的粉丝列表
 * @param {Number} followerId 被关注人的id
 */
const getUserByFollower = async (followerId) => {
    const result = await User.findAndCountAll({
        attributes: ['id', 'name', 'avatar'],
        order: [
            ['id', 'desc']
        ],
        include: {
            model: UserRelation,
            where: {
                followerId
            }
        }
    })
    // result.count 总数
    // result.rows 结果数组
    let userList = result.rows.map(row => row.dataValues)
    userList.map(u => delete u.user_relations)
    userList = formatUser(userList)
    return {
        count: result.count,
        userList
    }
}


/**
 * 获取关注该用户关注的用户列表
 * @param {Number} userId 被关注人的id
 */
const getFollowerByUser = async (userId) => {
    const result = await UserRelation.findAndCountAll({
        where: {
            userId
        },
        include: {
            attributes: ['id', 'name', 'avatar', 'gender', 'birth'],
            model: User,
            order: [
                ['id', 'desc']
            ]
        }
    }) 
    // result.count 总数，result.rows 结果数组
    let userList = result.rows.map(row => row.dataValues)
    return {
        count: result.count,
        userList: userList.map(u => formatUser(u.User))
    }
}

/**
 * 添加关注关系
 * @param {Number} userId 用户id
 * @param {Number} followerId 要被关注用户id
 */
const addFollower = async (userId, followerId) => {
    const res = await UserRelation.create({
        userId,
        followerId
    })
    return res.dataValues

}

/**
 * 删除关注关系
 * @param {Number} userId 用户id
 * @param {Number} followerId 要被关注用户id
 */
const deleteFollower = async (userId, followerId) => {
    const res = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return res
}



module.exports = {
    getUserByFollower,
    getFollowerByUser,
    addFollower,
    deleteFollower
}