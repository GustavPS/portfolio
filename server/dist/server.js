var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
io.on('connection', function (socket) {
    console.log('New connection');
    socket.on("request-about-me", function () {
        console.log("request-about-me");
    });
});
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pluto971005"
});
con.connect(function (err) {
    if (err)
        throw err;
    global.db = con;
    console.log("Connected to mysql-server");
    http.listen(3000, function () {
        console.log("listening *:3000");
    });
});
//# sourceMappingURL=server.js.map