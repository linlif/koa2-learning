const Sequelize = require('sequelize');
const seq = require('../seq');

// 创建Modal
var User = seq.define('User', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

// (async () => {
//     // 同步模型（表）
//     await User.sync();
//     console.log("User模型表刚刚(重新)创建！");
// })();

module.exports = User;