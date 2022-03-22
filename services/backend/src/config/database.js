const Sequelize = require('sequelize');

const sequelize = new Sequelize('ez-budget', 'db-user', 'db-p4ssword', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

module.exports = sequelize;
