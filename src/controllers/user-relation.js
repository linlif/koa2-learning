/**
 * @description 用户关系controller
 * @author Linlif
 */

const { getUserByFollower, getFollowerByUser, addFollower, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel')
const { addFollowerFail } = require('../dataModel/ErrorModel')

/**
 * 获取用户的粉丝
 * @param {String} userId 用户id
 */
const getFans = async (userId) => {
    const { count, userList } = await getUserByFollower(userId)
    return new SuccessModel({
        data: {
            count,
            userList
        }
    })
}


/**
 * 获取用户的关注列表
 * @param {String} userId 用户id
 */
const getFollowers = async (userId) => {
    const { count, userList } = await getFollowerByUser(userId)
    return new SuccessModel({
        data: {
            count,
            userList
        }
    })
}

/**
 * 关注用户
 * @param {Number} userId 用户id
 * @param {Number} followerId 被关注用户id
 * @returns 
 */
const follow = async (userId, followerId) => {
    if (userId == followerId) {
        return new ErrorModel({ ...addFollowerFail, errMsg: '不能关注自己！' })
    }

    const { count, userList } = await getUserByFollower(userId) // 查找userId的粉丝列表
    console.log('userList', userList)
    if (userList.some(v => v.id == followerId)) {
        return new ErrorModel({ ...addFollowerFail, errMsg: '您已关注该用户！' })
    }

    const addRes = await addFollower(followerId, userId)
    console.log(addRes)
    if (addRes != null) {
        return new SuccessModel({
            message: '关注成功',
            data: addRes
        })
    }
    return new ErrorModel(addFollowerFail)
}

/**
 * 取消关注
 * @param {Number} userId 用户id
 * @param {Number} followerId 被关注用户id
 * @returns 
 */
const unFollow = async (userId, followerId) => {
    const { userList } = await getUserByFollower(followerId) // 查找被关注用户的粉丝列表

    console.log('userList', userList)

    if (!userList || !userList.find(v => v.id == userId)) {
        return new ErrorModel({ errMsg: '您未关注该用户！' })
    }

    const removeRes = await deleteFollower(userId, followerId);

    console.log('removeRes', removeRes)

    if (removeRes > 0) {
        return new SuccessModel({
            message: '取关成功',
            data: removeRes
        })
    }
    return new ErrorModel({ errMsg: '取关失败' })
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}