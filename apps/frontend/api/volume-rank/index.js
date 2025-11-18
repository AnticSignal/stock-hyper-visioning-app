const fetch = require('node-fetch');

module.exports = async function (context, req) {

    context.log("volume-rank function started");

    if (!req.body) {
        context.res = {
            status: 400,
            body: { error: "Request body is required. (req.body is undefined)" }
        };
        return;
    }

    // 거래량순위[v1_국내주식-047] (모의투자 미지원)
    // FID_COND_MRKT_DIV_CODE	조건 시장 분류 코드
    // FID_COND_SCR_DIV_CODE	조건 화면 분류 코드
    // FID_INPUT_ISCD	입력 종목코드
    // FID_DIV_CLS_CODE	분류 구분 코드
    // FID_BLNG_CLS_CODE	소속 구분 코드
    // FID_TRGT_CLS_CODE	대상 구분 코드
    // FID_TRGT_EXLS_CLS_CODE	대상 제외 구분 코드
    // FID_INPUT_PRICE_1	입력 가격1
    // FID_INPUT_PRICE_2	입력 가격2
    // FID_VOL_CNT	거래량 수

    const apiUrl = `${process.env.HTS_PROD_DOMAIN}/uapi/domestic-stock/v1/quotations/volume-rank?` +
        `FID_COND_MRKT_DIV_CODE=J&` +
        `FID_COND_SCR_DIV_CODE=${req.body.FID_COND_SCR_DIV_CODE}&` +
        `FID_INPUT_ISCD=${req.body.FID_INPUT_ISCD}&` + // 0000(전체) 기타(업종코드)
        `FID_DIV_CLS_CODE=${req.body.FID_DIV_CLS_CODE}&` + // 0(전체) 1(보통주) 2(우선주)
        `FID_BLNG_CLS_CODE=${req.body.FID_BLNG_CLS_CODE}&` + // 0 : 평균거래량 1:거래증가율 2:평균거래회전율 3:거래금액순 4:평균거래금액회전율
        `FID_TRGT_CLS_CODE=${req.body.FID_TRGT_CLS_CODE}&` + // "1 or 0 9자리 (차례대로 증거금 30% 40% 50% 60% 100% 신용보증금 30% 40% 50% 60%) ex) "111111111"
        `FID_TRGT_EXLS_CLS_CODE=${req.body.FID_TRGT_EXLS_CLS_CODE}&` + // "1 or 0 10자리 (차례대로 투자위험/경고/주의 관리종목 정리매매 불성실공시 우선주 거래정지 ETF ETN 신용주문불가 SPAC) ex) "0000000000"
        `FID_INPUT_PRICE_1=${req.body.FID_INPUT_PRICE_1}&` + // 가격 ~ ex) "0" 전체 가격 대상 조회 시 FID_INPUT_PRICE_1, FID_INPUT_PRICE_2 모두 ""(공란) 입력
        `FID_INPUT_PRICE_2=${req.body.FID_INPUT_PRICE_2}&` + // ~ 가격 ex) "1000000" 전체 가격 대상 조회 시 FID_INPUT_PRICE_1, FID_INPUT_PRICE_2 모두 ""(공란) 입력
        `FID_VOL_CNT=${req.body.FID_VOL_CNT}&` + // "거래량 ~ ex) "100000" 전체 거래량 대상 조회 시 FID_VOL_CNT ""(공란) 입력
        `FID_INPUT_DATE_1=${req.body.FID_INPUT_DATE_1}`; // ""(공란) 입력

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'appkey': process.env.APP_KEY,
                'appsecret': process.env.APP_SECRET,
                'tr_id': "FHPST01710000",
                'custtype': "P"
            }
        });

        const text = await response.text();
        context.log("RAW RESPONSE:", text);

        try {
            const data = JSON.parse(text);
            context.res = { status: 200, body: data };
        } catch (e) {
            context.log("JSON parse error:", text);
            context.res = { status: 500, body: "INVALID_JSON_RESPONSE" };
        }
    } catch (error) {
        context.res = { status: 500, body: { error: error.message } };
    }
};