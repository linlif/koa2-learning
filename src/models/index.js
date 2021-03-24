/**
 * @description 模板聚合页
 * @author Linlif
 */

const User =  require('./User');
const Blog =  require('./Blog');


// 外键关联
// User.hasMany(Blog, {
//     foreignKey: 'userId'
// });
Blog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    User,
    Blog
}