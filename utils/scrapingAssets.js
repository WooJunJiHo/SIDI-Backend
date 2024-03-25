const puppeteer = require('puppeteer');

//필터링 함수
const filterFunction = require('./scrapingFiltering');
const modelFilterFunction = require('./modelFiltering');
const { filter } = require('../node_modules/cheerio/lib/api/traversing');

//상태 분류
const conditionFunction = require('./conditionFiltering');



//번개장터 크롤링 순서
//1. 번개장터 검색 후 1페이지 100개 상품 제목과 pid 크롤링
//2. 제목 필터링
//2-1. 평균가 필터링
//3. 남은 pid에 해당하는 페이지 로드 후 게시글 크롤링 
//4. 게시글 필터링


//번개장터 크롤링 아이템
const assetNameBJ = '아이폰';
let timeSet = 1;



exports.scrapingBJ = async function bunjang(mysql, axios, openaiApiKey) {
    console.log(`[${timeSet++} 회차] ` + new Date());


    const url = `https://m.bunjang.co.kr/search/products?q=${assetNameBJ}`;
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
        //console.log(secondFiltered)

        //소문자 변환
        //소문자 변환
        const productData = filterFunction.convertLowerCase(secondFiltered);
        console.log('소문자 변환 : ' + productData.length)




        //GPT 상품 상태 분류
        let response;

        async function gptLoad() {
            response = await conditionFunction.conditionFiltering(JSON.stringify(productData), axios, openaiApiKey)

            // 대답이 없는 경우 재시도
            if (!response) {
                response = await conditionFunction.conditionFiltering(JSON.stringify(productData), axios, openaiApiKey)
            } else {
                //console.log(response)
                //기존 배열에 상태 키 밸류 추가
                const gptJSONData = filterFunction.conditionJSON(productData, response)
                console.log('GPT3.5 Turbo Filtering OK!')
                return gptJSONData;
            }
        }
        const gptProductData = await gptLoad();






        // 모델 넘버링 키워드 필터링
        // 모델 넘버링 키워드 필터링


        //아이폰 SE 리스트
        const iPhoneSEList = modelFilterFunction.iPhoneSEFiltering(productData);
        // console.log("SE 필터링 : " + iPhoneSEList.length)
        // console.log(iPhoneSEList)



        //아이폰 11 리스트
        const iPhone11List = modelFilterFunction.iPhone11Filtering(productData);

        const iPhone11MaxList = modelFilterFunction.maxFiltering(iPhone11List);
        // console.log("11 Max 필터링 : " + iPhone11MaxList.length)
        // console.log(iPhone11MaxList)

        const iPhone11ProList = modelFilterFunction.proFiltering(iPhone11List);
        // console.log("11 Pro 필터링 : " + iPhone11ProList.length)
        // console.log(iPhone11ProList)

        const iPhone11NormalList = modelFilterFunction.normalFiltering(iPhone11List);
        // console.log("11 Normal 필터링 : " + iPhone11NormalList.length)
        // console.log(iPhone11NormalList)



        //아이폰 12 리스트
        const iPhone12List = modelFilterFunction.iPhone12Filtering(productData);

        const iPhone12MaxList = modelFilterFunction.maxFiltering(iPhone12List);
        // console.log("12 Max 필터링 : " + iPhone12MaxList.length)
        // console.log(iPhone12MaxList)

        const iPhone12ProList = modelFilterFunction.proFiltering(iPhone12List);
        // console.log("12 Pro 필터링 : " + iPhone12ProList.length)
        // console.log(iPhone12ProList)

        const iPhone12MiniList = modelFilterFunction.miniFiltering(iPhone12List);
        // console.log("12 Mini 필터링 : " + iPhone12MiniList.length)
        // console.log(iPhone12MiniList)

        const iPhone12NormalList = modelFilterFunction.normalFiltering(iPhone12List);
        // console.log("12 Normal 필터링 : " + iPhone12NormalList.length)
        // console.log(iPhone12NormalList)



        //아이폰 13 리스트
        const iPhone13List = modelFilterFunction.iPhone13Filtering(productData);

        const iPhone13MaxList = modelFilterFunction.maxFiltering(iPhone13List);
        // console.log("13 Max 필터링 : " + iPhone13MaxList.length)
        // console.log(iPhone13MaxList)

        const iPhone13ProList = modelFilterFunction.proFiltering(iPhone13List);
        // console.log("13 Pro 필터링 : " + iPhone13ProList.length)
        // console.log(iPhone13ProList)

        const iPhone13MiniList = modelFilterFunction.miniFiltering(iPhone13List);
        // console.log("13 Mini 필터링 : " + iPhone13MiniList.length)
        // console.log(iPhone13MiniList)

        const iPhone13NormalList = modelFilterFunction.normalFiltering(iPhone13List);
        // console.log("13 Normal 필터링 : " + iPhone13NormalList.length)
        // console.log(iPhone13NormalList)



        //아이폰 14 리스트
        const iPhone14List = modelFilterFunction.iPhone14Filtering(productData);

        const iPhone14MaxList = modelFilterFunction.maxFiltering(iPhone14List);
        // console.log("14 Max 필터링 : " + iPhone14MaxList.length)
        // console.log(iPhone14MaxList)

        const iPhone14ProList = modelFilterFunction.proFiltering(iPhone14List);
        // console.log("14 Pro 필터링 : " + iPhone14ProList.length)
        // console.log(iPhone14ProList)

        const iPhone14PlusList = modelFilterFunction.plusFiltering(iPhone14List);
        // console.log("14 Plus 필터링 : " + iPhone14PlusList.length)
        // console.log(iPhone14PlusList)

        const iPhone14NormalList = modelFilterFunction.normalFiltering(iPhone14List);
        // console.log("14 Normal 필터링 : " + iPhone14NormalList.length)
        // console.log(iPhone14NormalList)



        //아이폰 15 리스트
        const iPhone15List = modelFilterFunction.iPhone15Filtering(productData);

        const iPhone15MaxList = modelFilterFunction.maxFiltering(iPhone15List);
        // console.log("15 Max 필터링 : " + iPhone15MaxList.length)
        // console.log(iPhone15MaxList)

        const iPhone15ProList = modelFilterFunction.proFiltering(iPhone15List);
        // console.log("15 Pro 필터링 : " + iPhone15ProList.length)
        // console.log(iPhone15ProList)

        const iPhone15PlusList = modelFilterFunction.plusFiltering(iPhone15List);
        // console.log("15 Plus 필터링 : " + iPhone15PlusList.length)
        // console.log(iPhone15PlusList)

        const iPhone15NormalList = modelFilterFunction.normalFiltering(iPhone15List);
        // console.log("15 Normal 필터링 : " + iPhone15NormalList.length)
        // console.log(iPhone15NormalList)






        // 데이터를 반복해서 데이터베이스에 삽입
        gptProductData.forEach(item => {
            const { title, price, info, condition } = item;
            const insertQuery = 'INSERT INTO AssetsPriceInfo (AssetsName, TITLE, PRICE, INFO, CONDITIONS, PLATFORM, DATE) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const insertValues = [assetNameBJ, title, price, info.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''), condition, '번개장터', new Date()];

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
                //const value = document.querySelector('.ProductSummarystyle__Value-sc-oxz0oy-19.gXkArV').textContent.trim();
                const info = document.querySelector('.ProductInfostyle__DescriptionContent-sc-ql55c8-3.eJCiaL > p').textContent.trim();

                return { title, price, info };
            });

            return productDetail;
        } catch (error) {
            //console.error(`Error fetching product detail for pid ${pid}:`, error);
            console.log('타임아웃 에러')
            return null;
        } finally {
            await page.close();
        }
    }
}