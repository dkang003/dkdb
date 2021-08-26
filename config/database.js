const { Sequelize } = require('sequelize');

module.exports = new Sequelize('testdb', 'root', '#S!780D5', {
    host: 'localhost',
    dialect: 'mysql'
});