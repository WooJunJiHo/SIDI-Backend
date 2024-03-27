const puppeteer = require('puppeteer');

//필터링 함수
const filterFunction = require('./scrapingFiltering');
const iPhoneModelFilterFunction = require('./iPhoneModelFiltering');
const galaxyModelFilterFunction = require('./galaxyModelFiltering');
const { filter } = require('cheerio/lib/api/traversing');



//번개장터 크롤링 순서
//1. 번개장터 검색 후 1페이지 100개 상품 제목과 pid 크롤링
//2. 제목 필터링
//2-1. 평균가 필터링
//3. 남은 pid에 해당하는 페이지 로드 후 게시글 크롤링 
//4. 게시글 필터링


let timeSet = 1;



exports.scrapingBJ = async function bunjang(mysql, assetNameBJ) {
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

        //소문자 변환
        //소문자 변환
        const productData = filterFunction.convertLowerCase(secondFiltered);
        console.log('소문자 변환 : ' + productData.length)
    


        //아이폰 필터링
        //아이폰 필터링
        if(assetNameBJ === '갤럭시S20') {
            const galaxyS20List = galaxyModelFilterFunction.galaxyS20Filtering(productData);
            console.log('갤럭시S20 필터링 : ' + galaxyS20List.length)
            //console.log(galaxyS20List)
        } else if (assetNameBJ === '갤럭시S21'){
            const galaxyS21List = galaxyModelFilterFunction.galaxyS21Filtering(productData);
            console.log('갤럭시S21 필터링 : ' + galaxyS21List.length)
            //console.log(galaxyS21List)
        } else if (assetNameBJ === '갤럭시S22'){
            const galaxyS22List = galaxyModelFilterFunction.galaxyS22Filtering(productData);
            console.log('갤럭시S22 필터링 : ' + galaxyS22List.length)
            //console.log(galaxyS22List)
        } else if (assetNameBJ === '갤럭시S23'){
            const galaxyS23List = galaxyModelFilterFunction.galaxyS23Filtering(productData);
            console.log('갤럭시S23 필터링 : ' + galaxyS23List.length)
            //console.log(galaxyS23List)
        } else if (assetNameBJ === '갤럭시 S24'){
            const galaxyS24List = galaxyModelFilterFunction.galaxyS24Filtering(productData);
            console.log('갤럭시S24 필터링 : ' + galaxyS24List.length)
            //console.log(galaxyS24List)
        } else {
            const iPhoneList = iPhoneModelFilterFunction.iPhoneFiltering(productData);
            console.log('아이폰 필터링 : ' + iPhoneList.length)
            //console.log(iPhoneList)
        }





        // 데이터를 반복해서 데이터베이스에 삽입
        productData.forEach(item => {
            const { title, price, value, info, assetName } = item;
            const insertQuery = 'INSERT INTO AssetsPriceInfo (AssetsName, TITLE, PRICE, VALUE, INFO, PLATFORM, DATE) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const insertValues = [assetName, title, price, value, info.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''), '번개장터', new Date()];

            mysql.query(insertQuery, insertValues, (error, results, fields) => {
                if (error) throw error;
                //console.log('Data inserted:', results);
            });
        });
        await browser.close();

        console.log('OK!');
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
                const value = document.querySelector('.ProductSummarystyle__Value-sc-oxz0oy-19.gXkArV').textContent.trim();
                const info = document.querySelector('.ProductInfostyle__DescriptionContent-sc-ql55c8-3.eJCiaL > p').textContent.trim();

                return { title, price, value, info };
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