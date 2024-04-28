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


let assetName = [galaxyS20, galaxyS21, galaxyS22, galaxyS23, galaxyS24, galaxyZ, galaxyBook, galaxyTabS6, galaxyTabS7, galaxyTabS8, galaxyTabS9, iPhoneSE, iPhone11, iPhone12, iPhone13, iPhone14, iPhone15, iPad, macBook];



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

let searchingAsset = 0;
let searchingPlatform = 0;

//키워드 한번씩 크롤링
// setInterval(() => {

//     if (searchingAsset == assetName.length) {
//         process.exit();
//     } else {
//         if(searchingPlatform == 0) {
//             //번개장터
//             scrapingBJFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName[searchingAsset]);
//             searchingPlatform = 1;
//         } else if (searchingPlatform == 1) {
//             //중고나라
//             scrapingJNFunction.scrapingJN(connection, axios, process.env.OPENAI_KEY, assetName[searchingAsset]);
//             searchingPlatform = 0;
//             searchingAsset++;
//         } //else if (searchingPlatform == 2) {
//             //당근마켓
//             //scrapingDGFunction.scrapingDG(connection, axios, process.env.OPENAI_KEY, assetName[searchingAsset]);
//             //searchingPlatform = 0;
//             //searchingAsset++;
//         //}
//     }

// }, 5 * 60 * 1000); // 5분




//번개장터, 중고나라 크롤링 1시간 간격(총 2시간)으로 주기적으로 실행
// setInterval(() => {

//     if (isFirstTime) {
//         scrapingJNFunction.scrapingJN(connection, axios, process.env.OPENAI_KEY, assetName);
//         isFirstTime = false;
//     } else {
//         scrapingBJFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName);
//         isFirstTime = true;
//     }

// }, 5 * 60 * 1000); // 2시간



//번개장터
//번개장터
// scrapingBJFunction.scrapingBJ(connection, axios, process.env.OPENAI_KEY, assetName[13]);




// 중고나라
// 중고나라
// scrapingJNFunction.scrapingJN(connection, axios, process.env.OPENAI_KEY, assetName[16]);




//당근마켓
//당근마켓
// scrapingDGFunction.scrapingDG(connection, axios, process.env.OPENAI_KEY, assetName);







//색상 정보
app.get('/getColor', (req, res) => {
    connection.query('SELECT * FROM AssetsMoreColor', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

//자산 정보
app.post('/getInfo', (req, res) => {
    const { index, name } = req.body;

    connection.query(`SELECT * FROM AssetsMoreInfo WHERE RESULT = ${mysql.escape(name)}`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});


//사용자 등록 자산
app.post('/addAsset', (req, res) => {
    const { index, CATEGORY, COMPANY, MODEL, MORE, COLOR, RGB } = req.body;

    const insertQuery = 'INSERT INTO Assets (COMPANY, MODEL, MORE, COLOR, CategoryID, DATE) VALUES (?, ?, ?, ?, ?, ?)';
    const insertValues = [COMPANY, MODEL, MORE, COLOR, CATEGORY, new Date()];

    connection.query(insertQuery, insertValues, (error, results, fields) => {
        if (error) {
            throw error;
        }
        // 삽입된 레코드의 ID 값을 가져오기 위해 SELECT LAST_INSERT_ID() 쿼리를 실행
        connection.query('SELECT LAST_INSERT_ID()', (error, results, fields) => {
            if (error) {
                throw error;
            }
            const insertedId = results[0]['LAST_INSERT_ID()'];
            res.json({ id: insertedId }); // 클라이언트에 삽입된 레코드의 ID를 응답으로 보냄
        });
    });
})


//QR 사용자 본인 자산 등록
app.post('/updateQR', (req, res) => {
    const { userID, assetID, price } = req.body;

    connection.query(`UPDATE Assets SET UserID=${mysql.escape(userID)}, PRICE=${mysql.escape(price)} WHERE AssetsID=${mysql.escape(assetID)}`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});




//크롤링 데이터 로드
app.get('/getScrapingAssets', (req, res) => {
    connection.query('SELECT * FROM AssetsPriceInfo', (error, results, fields) => {
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
                console.log('회원가입 완료');
            });

            connection.query(`SELECT * FROM User WHERE EMAIL=${mysql.escape(email)}`, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                res.json({ nickname, email, profileImg, userID: results[0].UserID });
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


const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


