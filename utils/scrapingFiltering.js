// 제목에서 필터링할 단어들
const filterKeywords = [
    //부속
    '거치대', '충전기', '라이트닝', '케이블', '케이스', '필름', '맥세이프', '8핀', '이어팟', '이어폰', 'usb', '어댑터',

    //부품
    '정품 액정', '부품', 

    //업자 키워드
    '매입', '특가', '입고', '성지', '일괄', '재고', '전색상', '시리즈', '대여', '물량', '협찬', 

    //교환글 키워드
    '교환', '교체', '교신',

    //구매글 키워드
    '사요', '구해요', '삽니다', '구매', 

    //그 외
    '쿠로미', 
];



//1차 분류 - 예외 데이터 필터링 (제목)
//1차 분류 - 예외 데이터 필터링 (제목)

exports.titleFiltering = function (data) {
    // 필터링된 결과를 담을 배열
    let filteredData = data.filter(item => {
        // "박스"를 발견한 경우
        if (item.title.includes('박스')) {
            // "풀박스"인 경우 필터링에서 제외하지 않음
            return !item.title.includes('풀박스');
        }

        // "박스"가 아닌 경우 필터링 수행
        return !filterKeywords.some(keyword => item.title.includes(keyword));
    });

    return filteredData;
};




//2차 분류 - 예외 데이터 필터링 (게시글)
//2차 분류 - 예외 데이터 필터링 (게시글)

exports.infoFiltering = function (data) {
    // 필터링된 결과를 담을 배열
    let filteredData = data.filter(item => {
        // "박스"를 발견한 경우
        if (item.info.includes('박스')) {
            // "풀박스"인 경우 필터링에서 제외하지 않음
            return !item.info.includes('풀박스');
        }

        // "박스"가 아닌 경우 필터링 수행
        return !filterKeywords.some(keyword => item.info.includes(keyword));
    });

    return filteredData;
};








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