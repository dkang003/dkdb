const { Sequelize } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    FirstName: {
        type: Sequelize.STRING
    },
    LastName: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    }
});

module.exports = User;