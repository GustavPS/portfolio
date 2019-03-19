var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('New connection');
});
http.listen(3000, function () {
    console.log("listening *:3000");
});
//# sourceMappingURL=server.js.map