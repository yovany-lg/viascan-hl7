const net = require('net');
const parser = require('./parser');
const myParser = require('./myParser');
const createRecord = require('./dbConnect');

const server = net.createServer((socket) => {
  const clientName = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[Server] - ${clientName} connected!`);
  socket.on('data', (data) => {
    const message = data.toString();
    if (!message.includes('OUL^R22')){
      return;
    }
    // myParser(message);
    const jsonData = myParser(message);
    // console.log(jsonData);
    createRecord(jsonData);
    socket.write(`Message received!`);
  });
  socket.on('end', () => {
    console.log(`[Server] - ${clientName} disconnected`);
  });
});

server.on('error', (err) => {
  console.error('[Server] - Error:', err);
});

server.listen(3002, () => {
  console.log('Server Listening');
})
