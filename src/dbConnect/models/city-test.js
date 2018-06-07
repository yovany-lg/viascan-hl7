const Sequelize = require('sequelize');

const city = (sequelize) => sequelize.define('city', {
  Name: Sequelize.STRING,
  CountryCode: Sequelize.STRING,
  District: Sequelize.STRING,
  Population: Sequelize.INTEGER,
  underscored: true,
});

module.exports = city;
