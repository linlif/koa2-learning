/**
 * @description 模板聚合页
 * @author Linlif
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');
const AtRelation = require('./AtRelations')

// 外键关联
// User.hasMany(Blog, {
//     foreignKey: 'userId'
// });
Blog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

// blog表关联用户关系表
Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId' // 目标表的key
})


Blog.hasMany(AtRelation, {
    foreignKey: 'blogId' // blogId对应Blog表的id
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}