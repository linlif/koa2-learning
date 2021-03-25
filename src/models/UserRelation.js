/**
 * @description 用户关注关系
 * @author Linlif
 */

const Sequelize = require('sequelize');
const seq = require('../seq');

const { STRING, BOOLEAN, BIGINT, INTEGER, TEXT } = require('../types');

// 创建Modal
var UserRelation = seq.define('user_relation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户id'
    }
});

module.exports = UserRelation;