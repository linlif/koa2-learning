const Sequelize = require('sequelize');
const dbconfig = require('./dbconfig');

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    pool: { // 连接池
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = sequelize;