const Sequelize = require('sequelize');

const observationRequest = (sequelize) => sequelize.define('observation_request', {
  order_number: Sequelize.STRING,
  service_identifier_id: Sequelize.STRING,
  service_identifier_text: Sequelize.STRING,
  service_identifier_coding_system: Sequelize.STRING,
}, {
  underscored: true,
});

module.exports = observationRequest
