//상태 분류
const conditionFunction = require('./conditionFiltering');

// 제목에서 필터링할 단어들
const titleFilterKeywords = [
    //부속
    '거치대', '충전기', '라이트닝', '케이블', '케이', '필름',
    '맥세이프', '8핀', '이어팟', '이어폰', 'usb', '어댑터', '강화유리',
    'SD', '리더기', '도구', '박스', '애플펜슬', '키보드',

    //부품
    '정품', '부품', '배터리', '액정', '스크린',

    //업자 키워드
    '매입', '매장', '특가', '입고', '성지', '일괄', '재고', '전색상', '시리즈', '대여', '물량', '협찬',

    //교환글 키워드
    '교환', '교체', '교신',

    //구매글 키워드
    '사요', '구해요', '삽니다', '구매',

    //그 외
    '쿠로미', '패스파인더', 'UAG', '오터박스', '에어팟', '셀카봉', '고프로', '가방', '파우치', '바이마이', '에디션', 
];

const infoFilterKeywords = [

    //업자 키워드
    '매입', '특가', '입고', '성지', '일괄', '재고', '전색상', '시리즈', '대여', '물량', '협찬', '사은품', '이벤트', '후기', '할인', '연중무휴', 

    //교환글 키워드
    '교환', '교체', '교신',

    //구매글 키워드
    '사요', '구해요', '삽니다',

    //그 외
    '쿠로미', '패스파인더', 'UAG', '오터박스',
]



//특수문자 제거
//특수문자 제거
const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;


//중고나라 기본 제공 글 제거
//중고나라 기본 제공 글 제거
const basicPost = ['※ 카페 상품 게시글은 자동으로 중고나라 앱사이트에 노출합니다 노출을 원하지 않으실 경우 고객센터로 문의 바랍니다 \n', 
    '※ 등록한 게시글이 회원의 신고를 받거나 이상거래로 모니터링 될 경우 중고나라 사기통합조회 db로 수집활용될 수 있습니다 \n', 
    '─────────────────── \n', 
    '📢 제목에 제조사 브랜드 명과 “상품명ex 갤럭시 s11 ”을 넣어 작성하면 보다 빠른 판매가 가능합니다  \n', 
    '📢 게시글 작성 시 배송 방법에 “직거래”와 “내 위치” 설정할 경우 보다 빠른 판매가 가능합니다 \n']


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
        
        if (item.condition === null || item.condition === undefined) {
            return false;
        } else {
            return item;
        }
    })

    return filteredData;
}


//특수문자 제거
//특수문자 제거
exports.deleteSpecialChar = function (data) {
    const filteredData = data.filter(item => {
        item.title = item.title.replace(reg, '');
        item.info = item.info.replace(reg, '');
        item.info = item.info.replace(basicPost[0], '');
        item.info = item.info.replace(basicPost[1], '');
        item.info = item.info.replace(basicPost[2], '');
        item.info = item.info.replace(basicPost[3], '');
        item.info = item.info.replace(basicPost[4], '');
        return item;
    })
    return filteredData;
}



//같은 게시글 필터링
//같은 게시글 필터링
exports.filterSamePost = function (data) {
    const filteredData = data.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.info === item.info
        ))
    )
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