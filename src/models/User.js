const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const seq = require('../seq');

const { STRING, BOOLEAN, BIGINT, INTEGER } = require('../types');

// 创建Modal
var User = seq.define('User', {
    id: {
        type: Sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true,
        // type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        // defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    name: {
        type: STRING(100),
        allowNull: false,
        unique: true
    },
    gender: INTEGER,
    birth: STRING(10),
    password: {
        type: STRING(50),
        allowNull: false,
        defaultValue: 123456
    },
    avatar: STRING(50),
    createdAt: BIGINT,
    updatedAt: BIGINT,
    version: BIGINT
}, {
    timestamps: false
});

// (async () => {
//     // 同步模型（表）
//     await User.sync();
//     console.log("User模型表刚刚(重新)创建！");
// })();

module.exports = User;