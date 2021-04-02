const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const seq = require('../seq');

const { STRING, BOOLEAN, BIGINT, INTEGER } = require('../types');

// 创建Modal
var User = seq.define('User', {
    name: {
        type: STRING(100),
        allowNull: false,
        unique: true
    },
    nickName: {
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
    avatar: STRING(50)
}, {
    // timestamps: false
});

module.exports = User;