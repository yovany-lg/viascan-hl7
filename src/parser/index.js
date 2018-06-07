const parser = require('@rimiti/hl7-object-parser');
const mapping = require('./mapping');
// console.log(mapping);

const dataParser = (message) => {
  // const message = data.toString();
  console.log('Received Message:', message);
  const jsonData = parser.decode(message, mapping);
  console.log('Parsed Data:', jsonData);
  return jsonData;
};

module.exports = dataParser;
