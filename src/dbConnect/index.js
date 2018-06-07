const Sequelize = require('sequelize');
const sequelize = new Sequelize('lis_db', 'lis', 'lispass', {
  dialect: 'mysql',
  logging: false,
});

const Specimen = require('./models/specimen')(sequelize);
const Result = require('./models/observation-results')(sequelize);
// const Observation = require('./models/observation-request')(sequelize);
Specimen.hasMany(Result, { as: 'results' });
// const observation = Result.belongsTo(Observation, { as: 'observation', foreignKey: 'observation_requests_id' });
// Observation.hasMany(Result);
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

    const obx = jsonData[`OBX${postfix}`]
    const result = await Result.findOne({ where: { specimen_id: spm.id,  identifier: obx.identifier } })
    // console.log('Observation:', observ);
    if (result === null) {
      Result.create({
        ...obx,
        date_time: Date(obx.date_time),
        specimen_id: spm.id,
      }).then(() => {
        console.log(`Observation Result Created: [${spm.specimen_id}] -> ${obx.identifier}`);
      })
    } else {
      console.log(`Observation Result Exists: [${spm.specimen_id}] -> ${obx.identifier}`);
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
