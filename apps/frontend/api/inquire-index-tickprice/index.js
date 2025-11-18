const fetch = require('node-fetch');

module.exports = async function (context, req) {

    context.log("inquire-index-tickprice function started");

    if (!req.body) {
        context.res = {
            status: 400,
            body: { error: "Request body is required. (req.body is undefined)" }
        };
        return;
    }

    // 국내업종 시간별지수(초)[국내주식-064]
    const apiUrl = `${process.env.HTS_PROD_DOMAIN}/uapi/domestic-stock/v1/quotations/inquire-index-tickprice?` +
        `FID_COND_MRKT_DIV_CODE=U&` + // 시장구분코드 (업종 U)
        `FID_INPUT_ISCD=${req.body.FID_INPUT_ISCD}&` // 입력 종목 코드(0001:거래소, 1001:코스닥, 2001:코스피200, 3003:KSQ150)

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'appkey': process.env.APP_KEY,
                'appsecret': process.env.APP_SECRET,
                'tr_id': "FHPUP02110100",
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