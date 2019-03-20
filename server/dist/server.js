"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlHandler_1 = require("./SqlHandler");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('New connection');
    socket.on("request-about-me", function () {
        console.log("Socket: request-about-me");
        SqlHandler_1.SqlHandler.getConnection(function (connection) {
            connection.query("SELECT * FROM AboutMe", function (err, result) {
                if (err)
                    throw err;
                socket.emit("about-me", JSON.stringify(result[0]));
            });
        });
    });
    socket.on("request-resource-links", function () {
        console.log("Socket: request-resource-links");
        SqlHandler_1.SqlHandler.getConnection(function (connection) {
            connection.query("SELECT name, link, icon FROM Resources", function (err, result) {
                if (err)
                    throw err;
                socket.emit("resource-links", result);
            });
        });
    });
});
http.listen(3000, function () {
    console.log("listening *:3000");
});
//# sourceMappingURL=server.js.map