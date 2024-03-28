const express = require('express');
const http = require('http');
const mysql = require('mysql');
const dotenv = require('dotenv');
const axios = require('axios');

//크롤링
const scrapingFunction = require('./utils/scrapingBJAssets');



//번개장터 크롤링 아이템
let assetName = '아이폰';
const iPhone = '아이폰';
const galaxyS20 = '갤럭시S20'
const galaxyS21 = '갤럭시S21'
const galaxyS22 = '갤럭시S22'
const galaxyS23 = '갤럭시S23'
const galaxyS24 = '갤럭시S24'



const app = express();
const server = http.createServer(app);

dotenv.config(); // dotenv를 사용하여 환경 변수 로드 (env)

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect();




//번개장터 크롤링 2시간 간격으로 주기적으로 실행
setInterval(() => {
    scrapingFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName);
}, 10 * 60 * 1000); // 2시간


scrapingFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName);
//conditionTraining.conditionTraining();




//특수문자 제거 
//.replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')






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


const port = process.env.REACT_APP_PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


