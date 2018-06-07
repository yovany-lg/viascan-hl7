const Sequelize = require('sequelize');
const sequelize = new Sequelize('lis_db', 'lis', 'lispass', {
  dialect: 'mysql',
  logging: false,
});

const Specimen = require('./models/specimen')(sequelize);
const Observation = require('./models/observation-request')(sequelize);
const Result = require('./models/observation-results')(sequelize);
Specimen.hasMany(Observation, { as: 'observations' });
const observation = Result.belongsTo(Observation, { as: 'observation', foreignKey: 'observation_requests_id' });
Observation.hasMany(Result);
sequelize.sync();

const getSpecimen = (spm) => Specimen.findOne({
    where: { specimen_id: spm.specimen_id },
    // include: [{ model: Observation, as: 'observations' }],
  })
  .then((specimen) => {
    return !specimen ? Specimen.create({
      ...spm,
    }) :
    specimen;
  });

const createAllObr = async (spm, jsonData) => {
  let index = 1;
  while (true) {
    const postfix = index > 1 ? `[${index}]` : '';
    const obrId = `OBR${postfix}`;
    const obr = jsonData[obrId];
    if (!obr) {
      break;
    }

    const observ = await Observation.findOne({ where: { specimen_id: spm.id,  service_identifier_id: obr.service_identifier_id } })
    // console.log('Observation:', observ);
    if (observ === null) {
      const obx = jsonData[`OBX${postfix}`]
      Result.create({
        ...obx,
        observation: {
          ...obr,
          specimen_id: spm.id,
        },
      }, {
        include: [ observation ]
      })
    } else {
      console.log('Observation Exists:', obr.service_identifier_id);
    }
    index++;
  }
}

const createRecord = async (jsonData) => {
  const spm = jsonData['SPM'];
  // const obr = jsonData['OBR'];
  // const obx = jsonData['OBX'];
  const specimen = await getSpecimen(spm);
  // console.log('Specimen:', specimen);
  // const observations = specimen.observations;
  createAllObr(specimen, jsonData);
};

module.exports = createRecord;
