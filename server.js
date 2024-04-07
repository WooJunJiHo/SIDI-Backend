const express = require('express');
const http = require('http');
const mysql = require('mysql');
const dotenv = require('dotenv');
const axios = require('axios');

//크롤링
const scrapingBJFunction = require('./utils/scrapingBJAssets');
const scrapingJNFunction = require('./utils/scrapingJNAssets');
const scrapingDGFunction = require('./utils/scrapingDGAssets');
const { is } = require('./node_modules/cheerio/lib/api/traversing');



//번개장터 크롤링 아이템
let assetName = '맥북';
const iPhone = '아이폰';
const galaxyS20 = '갤럭시S20';
const galaxyS21 = '갤럭시S21';
const galaxyS22 = '갤럭시S22';
const galaxyS23 = '갤럭시S23';
const galaxyS24 = '갤럭시S24';
const galaxyZ = '갤럭시Z';

const iPad = '아이패드';

const macBook = '맥북';



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



let isFirstTime = true;


//번개장터, 중고나라 크롤링 1시간 간격(총 2시간)으로 주기적으로 실행
setInterval(() => {

    if(isFirstTime) {
        scrapingJNFunction.scrapingJN(connection, axios, process.env.OPENAI_KEY, assetName);
        isFirstTime = false;
    } else {
        scrapingBJFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName);
        isFirstTime = true;
    }

}, 10 * 60 * 1000); // 2시간



//번개장터
//번개장터
scrapingBJFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName);




// 중고나라
// 중고나라
// scrapingJNFunction.scrapingJN(connection, axios, process.env.OPENAI_KEY, assetName);




//당근마켓
//당근마켓
// scrapingDGFunction.scrapingDG(connection, axios, process.env.OPENAI_KEY, assetName);



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


