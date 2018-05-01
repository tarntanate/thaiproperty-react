const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const chalk = require('chalk');
const log = console.log;
const errorText = chalk.red;
const successText = chalk.bold.green;
const infoText = chalk.bold.blueBright;
const warningText = chalk.bold.yellow;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this will allow access to /socket.io/socket.io.js on client

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  log(warningText('New user connected'));
  socket.on('disconnect', () => {
    log(errorText('Disconnected from client..'));
  });

  socket.on('newMessage', (message) => {
    log(message);
    log(successText(message.text));
    // io.emit('newMessage', {
    //   to: message.to,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage', {
        to: message.to,
        text: message.text,
        createdAt: new Date().getTime()
      });
  });
  
  // setTimeout(() => {
  //   socket.emit('newEmail', {
  //     from: 'webmaster',
  //     text: 'ยินดีต้อนรับ',
  //     createdAt: new Date().getTime()
  //   })}, 1000
  // );
});

server.listen(port, ()=> {
  console.clear();
  log(successText(`Express server is running on port ${port}`));
});