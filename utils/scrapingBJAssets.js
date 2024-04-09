const puppeteer = require('puppeteer');

//필터링 함수
const filterFunction = require('./scrapingFiltering');
const iPhoneModelFilterFunction = require('./iPhoneModelFiltering');
const galaxyModelFilterFunction = require('./galaxySModelFiltering');
const galaxyZModelFilterFunction = require('./galaxyZModelFiltering');
const galaxyBookFilterFunction = require('./galaxyBookModelFiltering');
const galaxyTabSFilterFunction = require('./galaxyTabSModelFiltering');

const iPadModelFilterFunction = require('./iPadModelFiltering');
const macBookModelFilterFunction = require('./macBookModelFiltering');
const { filter } = require('../node_modules/cheerio/lib/api/traversing');


//상태 분류
const conditionFunction = require('./conditionFiltering');


//번개장터 크롤링 순서
//1. 번개장터 검색 후 1페이지 100개 상품 제목과 pid 크롤링
//2. 제목 필터링
//2-1. 평균가 필터링
//3. 남은 pid에 해당하는 페이지 로드 후 게시글 크롤링 
//4. 게시글 필터링


let timeSet = 1;



exports.scrapingBJ = async function bunjang(mysql, axios, openaiApiKey, assetName) {
    console.log('번개장터 크롤링 ' + `[${timeSet++} 회차] ` + new Date());


    const url = `https://m.bunjang.co.kr/search/products?q=${assetName}`;
    const componentSelector = 'a.sc-jKVCRD.bqiLXa';  // 상품을 나타내는 클래스 선택자로 수정

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // 페이지가 로드될 때까지 대기
        await page.waitForSelector(componentSelector);

        // A 컴포넌트의 data-pid 값, 제목, 가격 가져오기
        const data = await page.evaluate((selector) => {
            const productElements = document.querySelectorAll(selector);
            const productsData = [];

            for (const productElement of productElements) {
                const pid = productElement.getAttribute('data-pid');
                const title = productElement.querySelector('.sc-iBEsjs.fqRSdX').textContent.trim();
                const price = parseInt(productElement.querySelector('.sc-hzNEM.bmEaky').textContent.trim().replace(/,/gi, ''));
                const location = productElement.querySelector('.sc-chbbiW.ncXbJ').textContent.trim();

                productsData.push({ pid, title, price, location });
            }

            return productsData;
        }, componentSelector);



        //1차 분류 - 예외 데이터 필터링 (제목)
        //1차 분류 - 예외 데이터 필터링 (제목)
        const firstFiltered = filterFunction.titleFiltering(data)


        console.log("1차 필터링 : " + firstFiltered.length);

        //평균가 필터링 함수 위치


        // 각 pid에 대해 순차적으로 상세 설명 페이지에 들어가 데이터 가져오기
        const productDetails = [];
        for (const product of firstFiltered) {
            const pid = product.pid;
            const productDetail = await getProductDetail(pid, browser);
            if (productDetail) {
                productDetails.push(productDetail);
            }
        }


        //2차 분류 - 예외 데이터 필터링 (게시글)
        //2차 분류 - 예외 데이터 필터링 (게시글)
        const secondFiltered = filterFunction.infoFiltering(productDetails);

        console.log("2차 필터링 : " + secondFiltered.length)

        //소문자 변환
        //소문자 변환
        const productData = filterFunction.convertLowerCase(secondFiltered);
        console.log('소문자 변환 : ' + productData.length)
        //console.log(productData)
    


        
        let filteredList = null;


        //모델 분류
        //모델 분류
        if(assetName === '갤럭시S20') {
            filteredList = galaxyModelFilterFunction.galaxyS20Filtering(productData);
            console.log('갤럭시S20 필터링 : ' + filteredList.length)
            //console.log(galaxyS20List)
        } else if (assetName === '갤럭시S21'){
            filteredList = galaxyModelFilterFunction.galaxyS21Filtering(productData);
            console.log('갤럭시S21 필터링 : ' + filteredList.length)
            //console.log(galaxyS21List)
        } else if (assetName === '갤럭시S22'){
            filteredList = galaxyModelFilterFunction.galaxyS22Filtering(productData);
            console.log('갤럭시S22 필터링 : ' + filteredList.length)
            //console.log(galaxyS22List)
        } else if (assetName === '갤럭시S23'){
            filteredList = galaxyModelFilterFunction.galaxyS23Filtering(productData);
            console.log('갤럭시S23 필터링 : ' + filteredList.length)
            //console.log(galaxyS23List)
        } else if (assetName === '갤럭시 S24'){
            filteredList = galaxyModelFilterFunction.galaxyS24Filtering(productData);
            console.log('갤럭시S24 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } 

        else if (assetName === '갤럭시Z') {
            filteredList = galaxyZModelFilterFunction.galaxyZFiltering(productData);
            console.log('갤럭시Z 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } 

        else if (assetName === '갤럭시북') {
            filteredList = galaxyBookFilterFunction.galaxyBookFiltering(productData);
            console.log('갤럭시북 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } 

        else if (assetName === '갤럭시탭S6') {
            filteredList = galaxyTabSFilterFunction.galaxyTabS6Filtering(productData);
            console.log('갤럭시탭S6 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } else if (assetName === '갤럭시탭S7') {
            filteredList = galaxyTabSFilterFunction.galaxyTabS7Filtering(productData);
            console.log('갤럭시탭S7 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } else if (assetName === '갤럭시탭S8') {
            filteredList = galaxyTabSFilterFunction.galaxyTabS8Filtering(productData);
            console.log('갤럭시탭S8 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        } else if (assetName === '갤럭시탭S9') {
            filteredList = galaxyTabSFilterFunction.galaxyTabS9Filtering(productData);
            console.log('갤럭시탭S9 필터링 : ' + filteredList.length)
            //console.log(galaxyS24List)
        }
        


        else if (assetName === '아이폰se') {
            filteredList = iPhoneModelFilterFunction.iPhoneSEFiltering(productData);
            console.log('아이폰 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        } else if (assetName === '아이폰11') {
            filteredList = iPhoneModelFilterFunction.iPhone11Filtering(productData);
            console.log('아이폰11 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        } else if (assetName === '아이폰12') {
            filteredList = iPhoneModelFilterFunction.iPhone12Filtering(productData);
            console.log('아이폰12 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        } else if (assetName === '아이폰13') {
            filteredList = iPhoneModelFilterFunction.iPhone13Filtering(productData);
            console.log('아이폰13 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        } else if (assetName === '아이폰14') {
            filteredList = iPhoneModelFilterFunction.iPhone14Filtering(productData);
            console.log('아이폰14 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        } else if (assetName === '아이폰15') {
            filteredList = iPhoneModelFilterFunction.iPhone15Filtering(productData);
            console.log('아이폰15 필터링 : ' + filteredList.length)
            //console.log(iPhoneList)
        }

        else if (assetName === '아이패드') {
            filteredList = iPadModelFilterFunction.iPadFiltering(productData);
            console.log('아이패드 필터링 : ' + filteredList.length)
            //console.log(iPadList)
        } 
        
        else if (assetName === '맥북') {
            filteredList = macBookModelFilterFunction.macBookFiltering(productData);
            console.log('맥북 필터링 : ' + filteredList.length)
            //console.log(iPadList)
        }


        //console.log(filteredList.length)
        //console.log(filteredList)


        //특수문자 제거
        filteredList = filterFunction.deleteSpecialChar(filteredList);

        console.log('특수문자 제거 : ' + filteredList.length)
        // console.log(filteredList)



        //같은 게시글 제거
        filteredList = filterFunction.filterSamePost(filteredList);
        console.log('중복 제거 후 : ' + filteredList.length)
        //console.log(filteredList)


        //GPT 상품 상태 분류
        let response;

        async function gptLoad() {
            response = await conditionFunction.conditionFiltering(JSON.stringify(filteredList), axios, openaiApiKey)

            // 대답이 없는 경우 재시도
            if (!response) {
                response = await conditionFunction.conditionFiltering(JSON.stringify(filteredList), axios, openaiApiKey)
            } else {
                //console.log(response)
                //기존 배열에 상태 키 밸류 추가
                const gptJSONData = filterFunction.conditionJSON(filteredList, response)
                console.log('GPT3.5 Turbo Filtering OK!')
                return gptJSONData;
            }
        }
        const gptProductData = await gptLoad();

        console.log('GPT 상태분류 : ' + gptProductData.length)
        //console.log(gptProductData)

        const saveData = filterFunction.deleteNullValue(gptProductData);
        console.log('오류값 제거 후 : ' + saveData.length)



        // 데이터를 반복해서 데이터베이스에 삽입
        saveData.forEach(item => {
            const { title, price, info, condition, assetName } = item;
            const insertQuery = 'INSERT INTO AssetsPriceInfo (AssetsName, TITLE, PRICE, INFO, CONDITIONS, PLATFORM, DATE) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const insertValues = [assetName, title, price, info.replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, ''), condition, '번개장터', new Date()];

            mysql.query(insertQuery, insertValues, (error, results, fields) => {
                if (error) throw error;
                //console.log('Data inserted:', results);
            });
        });

        await browser.close();

        console.log('MYSQL DB SAVE OK!');
    })();



    //해당 pid의 상세 페이지 크롤링 코드
    async function getProductDetail(pid, browser) {
        const page = await browser.newPage();
        const productDetailUrl = `https://m.bunjang.co.kr/products/${pid}`;

        try {
            await page.goto(productDetailUrl);

            // 페이지가 로드될 때까지 대기
            await page.waitForSelector('.ProductSummarystyle__Name-sc-oxz0oy-4.gYcooF');  // 실제 상세 페이지의 선택자로 수정

            // 필요한 데이터를 추출하거나 다른 작업 수행
            const productDetail = await page.evaluate(() => {
                // 상세 페이지에서 필요한 데이터 추출
                const title = document.querySelector('.ProductSummarystyle__Name-sc-oxz0oy-4.gYcooF').textContent.trim();  // 제목에 해당하는 선택자로 수정
                const price = parseInt(document.querySelector('.ProductSummarystyle__Price-sc-oxz0oy-6.dJuwUw').textContent.trim().replace(/,/gi, '').replace(/원/gi, ''));  // 설명에 해당하는 선택자로 수정
                const info = document.querySelector('.ProductInfostyle__DescriptionContent-sc-ql55c8-3.eJCiaL > p').textContent.trim();

                return { title, price, info };
            });

            return productDetail;
        } catch (error) {
            console.error(`Error fetching product detail for pid ${pid}:`, error);
            return null;
        } finally {
            await page.close();
        }
    }
}