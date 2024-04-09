const express = require('express');
const http = require('http');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');

//크롤링
const scrapingBJFunction = require('./utils/scrapingBJAssets');
const scrapingJNFunction = require('./utils/scrapingJNAssets');
const scrapingDGFunction = require('./utils/scrapingDGAssets');
const { is } = require('./node_modules/cheerio/lib/api/traversing');



//크롤링 아이템
let assetName = '아이폰se';

const galaxyS20 = '갤럭시S20';
const galaxyS21 = '갤럭시S21';
const galaxyS22 = '갤럭시S22';
const galaxyS23 = '갤럭시S23';
const galaxyS24 = '갤럭시S24';

const galaxyZ = '갤럭시Z';

const galaxyBook = '갤럭시북';

const galaxyTabS6 = '갤럭시탭S6';
const galaxyTabS7 = '갤럭시탭S7';
const galaxyTabS8 = '갤럭시탭S8';
const galaxyTabS9 = '갤럭시탭S9';



const iPhoneSE = '아이폰se';
const iPhone11 = '아이폰11';
const iPhone12 = '아이폰12';
const iPhone13 = '아이폰13';
const iPhone14 = '아이폰14';
const iPhone15 = '아이폰15';

const iPad = '아이패드';

const macBook = '맥북';



const app = express();
const server = http.createServer(app);
// JSON 파싱을 위한 미들웨어 추가
app.use(bodyParser.json());

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

// 로그인 확인
app.post('/fetchLogin', (req, res) => {
    const { nickname, email, profileImg } = req.body;

    // 가입 확인
    connection.query(`SELECT * FROM User WHERE EMAIL=${mysql.escape(email)}`, (error, results, fields) => {
        if (error) {
            throw error;
        }
        
        if (results.length > 0) {
            // 계정이 존재하는 경우
            res.json({ nickname, email, profileImg, userID: results[0].UserID });
        } else {
            // 계정이 존재하지 않는 경우 회원가입 진행
            const insertQuery = 'INSERT INTO User (NICKNAME, EMAIL, ProfileImage, DATE) VALUES (?, ?, ?, ?)';
            const insertValues = [nickname, email, profileImg, new Date()];

            connection.query(insertQuery, insertValues, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                // 회원가입 완료 응답
                res.json('회원가입 완료');
            });
        }
    });
});

//자산 로드
app.post('/fetchUserAssets', (req, res) => {
    const { nickname, email, profileImg } = req.body;

    //아이디값 확인
    connection.query(`SELECT * FROM User WHERE EMAIL=${mysql.escape(email)}`, (error, results, fields) => {
        if (error) {
            throw error;
        }

        if (results.length > 0) {
            // 계정이 존재하는 경우
            connection.query(`SELECT * FROM Assets WHERE UserID=${results[0].UserID}`, (error, results, fields) => {
                if (error) throw error;
                res.json(results);
            });

        } else {
            // 계정이 존재하지 않는 경우
            res.json('데이터 로드 실패! 로그인을 해주세요')
        }
    });
});


const port = process.env.REACT_APP_PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


