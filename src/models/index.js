/**
 * @description 模板聚合页
 * @author Linlif
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');


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

module.exports = {
    User,
    Blog,
    UserRelation
}