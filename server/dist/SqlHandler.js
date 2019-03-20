"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var SqlHandler = /** @class */ (function () {
    function SqlHandler() {
    }
    SqlHandler.getConnection = function (callback) {
        SqlHandler.pool.getConnection(function (err, connection) {
            if (err)
                throw err;
            callback(connection);
        });
    };
    SqlHandler.pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "pluto971005",
        database: "portfolio"
    });
    return SqlHandler;
}());
exports.SqlHandler = SqlHandler;
//# sourceMappingURL=SqlHandler.js.map