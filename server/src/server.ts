import {SqlHandler} from './SqlHandler';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket: any) => {
  console.log('New connection');

  socket.on("request-about-me", () => {
    console.log("Socket: request-about-me");
    SqlHandler.getConnection((connection) => {
      connection.query("SELECT * FROM AboutMe", (err, result) => {
        if(err) throw err;

        socket.emit("about-me", JSON.stringify(result[0]));
      });
    });
  });

  socket.on("request-resource-links", () => {
    console.log("Socket: request-resource-links");
    SqlHandler.getConnection((connection) => {
      connection.query("SELECT name, link, icon FROM Resources", (err, result) => {
        if(err) throw err;

        socket.emit("resource-links", result);
      });
    });
  });
});

http.listen(3000, () => {
  console.log("listening *:3000");
});
