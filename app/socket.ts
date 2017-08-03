var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import * as path from 'path';

const filePath = path.join(__dirname, '../data/index.html');

app.get('/', function(req, res){
  res.sendFile(filePath);
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
  console.log("ip: " + socket.handshake.address);
//   console.log("ip2:" + socket.request.connection._peername.address + ":" + socket.request.connection._peername.port);


  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');

  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});