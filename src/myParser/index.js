const mappings = require('./mapping');

const getSegments = (message) => message.split('\r').filter(seg => seg !== '');

const segmentId = (segment) => segment.substring(0, 3);

const getComponents = (field, separator, segmentId, fieldId) => {
  const mapping = mappings[segmentId];
  if (!mapping) {
    return {};
  }
  const components = field.split(separator);
  if (components.length > 1 && fieldId !== 'MSH-2') {
    return components.reduce((result, component, index) => ({
        ...result,
        [mapping[`${fieldId}.${index + 1}`]]: component
      }),
      {}
    );
  } else {
    return {
      [mapping[fieldId]]: field,
    };
  }
}

const fields = (segment, separator, segmentId) => segment.split(separator)
  .reduce(
    (result, field, index) => {
      if (field !== '' && index !== 0) {
        const fieldId = `${segmentId === 'MSH' ? index + 1 : index}`
        return ({
          ...result,
          ...getComponents(field, '^', segmentId, fieldId),
        });
      } else {
        return result
      }
    },
    {}
  )

const finalSegmentId = (segment, segmentCounter) => {
  const id = segmentId(segment);
  let count = 1;
  if (segmentCounter[id]) {
    segmentCounter[id] = segmentCounter[id] + 1;
    count = segmentCounter[id];
  } else {
    segmentCounter[id] = 1;
  }
  const finalId = count !== 1 ? `${id}[${count}]` : id;
  return finalId;
};

const toObject = (message) => {
  const segments = getSegments(message);
  const segmentCounter = {}
  return segments.reduce(
    (result, segment) => {
      const simpleId = segmentId(segment);
      const finalId = finalSegmentId(segment, segmentCounter);
      return {
        ...result,
        [finalId]: fields(segment, '|', simpleId),
      }
    },
    {}
  )
}

const parseMessage = (message) => {
  // console.log(message);
  const newMessage = message.replace(/[\n\u000B\u001C\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, '');
  const jsonData = toObject(newMessage);
  // console.log(jsonData);
  return jsonData;
};

module.exports = parseMessage;
