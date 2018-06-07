const Sequelize = require('sequelize');

const specimen = (sequelize) => sequelize.define('specimen', {
  set_id: Sequelize.STRING,
  specimen_id: Sequelize.STRING,
  type: Sequelize.STRING,
  role: Sequelize.STRING,
}, {
  underscored: true,
});

module.exports = specimen
