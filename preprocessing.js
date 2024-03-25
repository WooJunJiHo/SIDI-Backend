
exports.preprocessing = function preprocessing(text) {
    // 소문자 변환
    let lowerCaseText = text.toLowerCase();

    // 불용어 목록
    const stopWords = ["는", "이", "를", "위한", "예시입니다"];

    // 불용어 제거
    let filteredText = lowerCaseText.split(' ').filter(word => !stopWords.includes(word)).join(' ');

    // 특수 문자 제거
    let cleanedText = filteredText.replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');

    // 문장 분절
    let tokenizedText = cleanedText.split(' ');

    // 길이 조정 (예시: 최대 길이 10)
    let maxLength = 10;
    let trimmedText = tokenizedText.slice(0, maxLength).join(' ');

    // 결과 출력
    console.log("원본 텍스트:", text);
    console.log("소문자 변환:", lowerCaseText);
    console.log("불용어 제거:", filteredText);
    console.log("특수 문자 제거:", cleanedText);
    console.log("문장 분절:", tokenizedText);
    console.log("길이 조정:", trimmedText);

    return trimmedText;

}


