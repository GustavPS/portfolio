const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');

io.on('connection', (socket: any) => {
  console.log('New connection');

  socket.on("request-about-me", () => {
    console.log("request-about-me");
  });
});

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pluto971005"
});

con.connect((err) => {
  if(err) throw err;
  global.db = con;
  console.log("Connected to mysql-server");

  http.listen(3000, () => {
    console.log("listening *:3000");
  });
});
