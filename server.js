const express = require('express');
const http = require('http');
const mysql = require('mysql');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config(); // dotenv를 사용하여 환경 변수 로드

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect();

app.get('/getColor', (req, res) => {
  connection.query('SELECT * FROM AssetsMoreColor', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/getInfo', (req, res) => {
  connection.query('SELECT * FROM AssetsMoreInfo', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// 소켓 연결 처리
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg);
    console.log(user)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.REACT_APP_PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});