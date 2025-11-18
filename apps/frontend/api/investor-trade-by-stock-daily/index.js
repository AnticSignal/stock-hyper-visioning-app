const fetch = require('node-fetch');

module.exports = async function (context, req) {

    context.log("stock function started");

    
    function getTodayYyyymmdd() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    }


    if (!req.body) {
        context.res = {
            status: 400,
            body: { error: "Request body is required. (req.body is undefined)" }
        };
        return;
    }

    // 종목별 투자자매매동향(일별) 모의투자 미지원
    // FID_COND_MRKT_DIV_CODE	조건 시장 분류 코드 / J:KRX, NX:NXT, UN:통합
    // FID_INPUT_ISCD	입력 종목코드 / 종목번호 (6자리)
    // FID_INPUT_DATE_1	입력 날짜1 / 입력 날짜(20250812) (해당일 조회는 장 종료 후 정상 조회 가능)
    // FID_ORG_ADJ_PRC	수정주가 원주가 가격
    // FID_ETC_CLS_CODE	기타 구분 코드


    const apiUrl = `${process.env.HTS_PROD_DOMAIN}/uapi/domestic-stock/v1/quotations/investor-trade-by-stock-daily?` +
        `FID_COND_MRKT_DIV_CODE=J&` +
        `FID_INPUT_ISCD=${req.body.FID_INPUT_ISCD}&` +
        `FID_INPUT_DATE_1=${getTodayYyyymmdd()}&` +
        `FID_ORG_ADJ_PRC=&` + // 공란 입력
        `FID_ETC_CLS_CODE=`; // 공란 입력

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'appkey': process.env.APP_KEY,
                'appsecret': process.env.APP_SECRET,
                'tr_id': "FHPTJ04160001",
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