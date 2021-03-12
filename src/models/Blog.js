const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const seq = require('../seq');

const { STRING, BOOLEAN, BIGINT, INTEGER, TEXT } = require('../types');

// 创建Modal
var User = seq.define('User', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片'
    }
});

// (async () => {
//     // 同步模型（表）
//     await User.sync();
//     console.log("User模型表刚刚(重新)创建！");
// })();

module.exports = User;