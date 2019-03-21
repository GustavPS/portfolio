"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlHandler_1 = require("./SqlHandler");
var GitHubHandler_1 = require("./GitHubHandler");
var Logger_1 = require("./Logger");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Server = /** @class */ (function () {
    function Server(port) {
        this.gitHubHandler = new GitHubHandler_1.GitHubHandler("gustavps", "faed51ff4f72fa528f10145e31e3541e21b7f5ec");
        this.port = port;
    }
    Server.prototype.setupSocket = function () {
        io.on('connection', function (socket) {
            Logger_1.Logger.Debug("New connection");
            socket.on("request-about-me", function () {
                Logger_1.Logger.Debug("Socket: request-about-me");
                SqlHandler_1.SqlHandler.getConnection(function (connection) {
                    connection.query("SELECT * FROM AboutMe", function (err, result) {
                        if (err)
                            throw err;
                        socket.emit("about-me", JSON.stringify(result[0]));
                        connection.release();
                    });
                });
            });
            socket.on("request-resource-links", function () {
                Logger_1.Logger.Debug("Socket: request-resource-links");
                SqlHandler_1.SqlHandler.getConnection(function (connection) {
                    connection.query("SELECT name, link, icon FROM Resources", function (err, result) {
                        if (err)
                            throw err;
                        socket.emit("resource-links", result);
                        connection.release();
                    });
                });
            });
            socket.on("request-projects", function (count) {
                SqlHandler_1.SqlHandler.getConnection(function (connection) {
                    connection.query("SELECT * FROM Projects LIMIT ?", [count], function (err, result) {
                        if (err)
                            throw err;
                        socket.emit("projects", result);
                        connection.release();
                    });
                });
            });
        });
    };
    Server.prototype.startServer = function () {
        this.updateProjects();
        this.setupSocket();
        http.listen(this.port, function () {
            Logger_1.Logger.General("listening on *:3000");
        });
    };
    Server.prototype.updateProjects = function () {
        this.gitHubHandler.updateRepoDatabase();
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map