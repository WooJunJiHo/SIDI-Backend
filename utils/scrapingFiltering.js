// 제목에서 필터링할 단어들
const titleFilterKeywords = [
    //부속
    '거치대', '충전기', '라이트닝', '케이블', '케이', '필름',
    '맥세이프', '8핀', '이어팟', '이어폰', 'usb', '어댑터', '강화유리',
    'SD', '리더기', '도구', '박스',

    //부품
    '정품', '부품', '배터리', '액정', '스크린',

    //업자 키워드
    '매입', '매장', '특가', '입고', '성지', '일괄', '재고', '전색상', '시리즈', '대여', '물량', '협찬',

    //교환글 키워드
    '교환', '교체', '교신',

    //구매글 키워드
    '사요', '구해요', '삽니다', '구매',

    //그 외
    '쿠로미', '패스파인더', 'UAG', '오터박스',
];

const infoFilterKeywords = [

    //업자 키워드
    '매입', '특가', '입고', '성지', '일괄', '재고', '전색상', '시리즈', '대여', '물량', '협찬', '사은품', '이벤트', '후기', '할인',

    //교환글 키워드
    '교환', '교체', '교신',

    //구매글 키워드
    '사요', '구해요', '삽니다',

    //그 외
    '쿠로미', '패스파인더', 'UAG', '오터박스',
]



//1차 분류 - 예외 데이터 필터링 (제목)
//1차 분류 - 예외 데이터 필터링 (제목)

exports.titleFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldExclude = titleFilterKeywords.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    return filteredProducts;
};




//2차 분류 - 예외 데이터 필터링 (게시글)
//2차 분류 - 예외 데이터 필터링 (게시글)

exports.infoFiltering = function (data) {

    const filteredProducts = data.filter(item => {
        const shouldExclude = infoFilterKeywords.some(keyword =>
            item.info.includes(keyword)
        );
        return !shouldExclude;
    });

    return filteredProducts;
};


//소문자 변환
//소문자 변환
exports.convertLowerCase = function (data) {

    const parseJSON = JSON.parse(JSON.stringify(data));
    parseJSON.forEach(item => {
        for (let key in item) {
            if (typeof item[key] === 'string' && (key === 'title' || key === 'info')) {
                item[key] = item[key].replace(/[A-Za-z]+/g, match => match.toLowerCase());
            }
        }
    });

    return parseJSON;

}



//상태 분류
//상태 분류
exports.conditionJSON = function processData(data, gptData) {
    // 첫 번째 데이터 배열을 순회하면서 두 번째 데이터와 일치하는 제목을 가진 데이터에 condition 추가
    data.forEach(data1 => {
        const data2 = gptData.find(data2 => data2.title === data1.title);
        if (data2) {
            data1.condition = data2.condition;
        } else {
            data1 = null;
        }
    });

    //console.log(data);
    return data;
}


//오류 있는 값 제거
//오류 있는 값 제거
exports.deleteNullValue = function (data) {
    
    const filteredData = data.filter(item => {
        if(item.title !== null && item.price !== null && item.info !== null && item.condition !== null) {
            return item;
        } else {
            return null;
        }
    })

    return filteredData;
}




// // 평균 계산
// const averagePrice = calculateAveragePrice(data);

// // 특정 퍼센트(예: 10%)만큼 평균에서 떨어진 상품들을 배열에서 제외
// const percentageThreshold = 40;
// const distanceThreshold = averagePrice * (percentageThreshold / 100);
// const filteredProducts = data.filter(product => Math.abs(product.price - averagePrice) <= distanceThreshold);


// //금액 평균 구하는 함수 (거리가 먼 데이터 제거 목적)
// function calculateAveragePrice(products) {
//     const total = products.reduce((sum, product) => sum + product.price, 0);
//     return total / products.length;
// }