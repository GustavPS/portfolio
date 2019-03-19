const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket: any) {
  console.log('New connection');
});

http.listen(3000, function() {
  console.log("listening *:3000");
});
