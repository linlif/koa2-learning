/**
 * @description `@`关系表
 * @author Linlif
 */

const seq = require('../seq');
const { STRING, BOOLEAN, BIGINT, INTEGER, TEXT } = require('../types');

// 创建Modal
var AtRelation = seq.define('AtRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博ID'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        comment: '是否已读',
        defaultValue: false
    }
});

module.exports = AtRelation;