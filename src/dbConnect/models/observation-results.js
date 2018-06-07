const Sequelize = require('sequelize');

const observationResult = (sequelize) => sequelize.define('observation_result', {
  value_type: Sequelize.STRING,
  identifier: Sequelize.STRING,
  identifier_text: Sequelize.STRING,
  identifier_coding_system: Sequelize.STRING,
  value: Sequelize.STRING,
  unit_identifier: Sequelize.STRING,
  unit_text: Sequelize.STRING,
  unit_coding_system: Sequelize.STRING,
  references_range: Sequelize.STRING,
  abnormal_flags: Sequelize.STRING,
  result_status: Sequelize.STRING,
  responsible_observer: Sequelize.STRING,
  equipment_namespace: Sequelize.STRING,
  date_time: Sequelize.DATE,
}, {
  underscored: true,
});

module.exports = observationResult;
