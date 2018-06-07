var fs = require('fs');
var parse = require('csv-parse');
const moment = require('moment');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('lis_db', 'lis', 'lispass', {
  dialect: 'mysql',
  logging: false,
});

const Specimen = require('../dbConnect/models/specimen')(sequelize);
// const Observation = require('../dbConnect/models/observation-request')(sequelize);
const Result = require('../dbConnect/models/observation-results')(sequelize);
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

const saveSpecimenData = async (data) => {
  const firtsRow = data[0];
  const specimen = await getSpecimen({
    specimen_id: firtsRow[0],
    type: firtsRow[1],
    role: 'P'
  });
  await Promise.all(data.map(async (row) => {
    // console.log('DATE!:', Date(row[8]));
    await Result.create({
      identifier: row[2],
      identifier_text: row[2],
      value: row[4],
      unit_identifier: row[5],
      abnormal_flags: row[6],
      references_range: row[7],
      date_time: Date(row[8]),
      specimen_id: specimen.id,
    })
    return null;
  })).then(() => {
    console.log('Migration ended...');
  });
}

var parser = parse({delimiter: ','}, async (err, data) => {
  // console.log(data);
  data.shift();
  data.shift();
  let counter = 0;
  let prevRow = data.shift();
  let row;
  let spmData = [];
  while(data.length > 0) {
    spmData.push(prevRow);
    row = data.shift();
    if (prevRow[0] !== row[0]) {
      // console.log('SPM Data:', spmData);
      await saveSpecimenData(spmData);
      spmData = [];
    }
    prevRow = row;
    // counter++;
    // spmData.push(row);
  }

  // await Promise.all(data.map(async (row, index) => {
  //     if (index === 0) {
  //       return null;
  //     }
  //     // if (specimen_id !== row[0]) {
  //     specimen = await getSpecimen({
  //       specimen_id: row[0],
  //       type: row[1],
  //       role: 'P'
  //     });
  //     // specimen_id = row[0];
  //     // }
  //     await Result.create({
  //       observation_identifier_id: row[2],
  //       observation_identifier_text: row[2],
  //       value: row[4],
  //       unit_identifier: row[5],
  //       abnormal_flags: row[6],
  //       references_range: row[7],
  //       date_time: row[8],
  //       observation: {
  //         service_identifier_id: row[2],
  //         service_identifier_text: row[2],
  //         specimen_id: row[0],
  //       },
  //     }, {
  //       include: [ observation ]
  //     })
  //     return null;
  //   }));
});

fs.createReadStream(__dirname+'../../../backups/AutomaticPatientsReport2.csv').pipe(parser);

// const csvLoader = () => new Promise((resolve, reject) => {
//   fs.createReadStream(__dirname+'../../../backups/AutomaticPatientsReport.csv')
//   .pipe(parse({delimiter: ','}, function(err, data){
//     console.log(data);
//     resolve(data);
//   }));
// });

// module.exports = csvLoader;
