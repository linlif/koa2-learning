// const Sequelize = require('sequelize');
const seq = require('../seq');

// 创建Modal
var Pet = seq.define('Pet', {
    id: {
        type: seq.Sequelize.STRING(50),
        primaryKey: true
    },
    name: seq.Sequelize.STRING(100),
    gender: seq.Sequelize.BOOLEAN,
    birth: seq.Sequelize.STRING(10),
    createdAt: seq.Sequelize.BIGINT,
    updatedAt: seq.Sequelize.BIGINT,
    version: seq.Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = Pet;