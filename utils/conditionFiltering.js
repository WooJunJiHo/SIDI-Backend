//GPT3.5 요청
exports.conditionFiltering = async (prompt, axios, apiKey) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'system', content:
                            `
                                역할: 제품 상태를 파악하여 클래스를 JSON 형식으로 분류합니다.

                                [클래스]
                                1. 새상품: 미개봉 혹은 개봉만 된 사용한적 없는 제품
                                2. 이상 없음: 아무 이상 없는 중고 제품
                                3. 기스: 기스, 스크레치, 찍힘 등 가벼운 생활기스가 있는 제품
                                4. 액정 파손: 액정이 금가있거나 깨져있는 문제있는 제품
                                5. 외판 손상: 액정을 제외한 나머지 부분에 파손이 있는 제품
                                6. 기능 고장: 버튼 고장, 카메라 고장 등 기능 사용에 있어서 문제가 있는 제품

                                [분류 주의사항]
                                1. 클래스 분류의 기준은 prompt의 info를 보고 손상도의 상세 설명을 참조합니다.
                                2. 해당되는 클래스가 많다면 손상도가 높은 한 개를 적용합니다.
                                    - 손상도: 기능 고장 > 액정 파손 > 외판 파손 > 기스 > 이상 없음 > 새상품
                                3. prompt의 JSON에 속해있는 모든 데이터를 분류해야 합니다.
                                    - 다만 해당되는 클래스가 없는 경우에는 답변에서 제외합니다.

                                [응답 형식]
                                1. JSON 형태로 출력합니다.
                                2. {"title": "", "condition": ""}
                                3. title은 prompt의 title과 동일해야 합니다.
                                4. condition은 1번의 클래스 6개 중 하나입니다.

                            `
                    },

                    { role: 'user', content: prompt },
                ],
                max_tokens: 2000,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                }
            }
        )

        // 응답이 없는 경우 재시도를 위해 null 반환
        if (!response.data.choices || response.data.choices.length === 0) {
            return null;
        }

        try {
            // 데이터를 파싱하여 점수와 평가를 추출합니다.
            const content = JSON.parse(response.data.choices[0].message.content);

            return content
        } catch (error) {
            console.error('JSON Parse error:', error)
            return null;
        }

    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
        return null;
    }
}



