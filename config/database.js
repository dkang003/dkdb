const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPW, {
    host: 'localhost',
    dialect: 'mysql'
});