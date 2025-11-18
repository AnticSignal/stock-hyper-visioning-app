const fetch = require('node-fetch');

module.exports = async function (context, req) {

    context.log("stock function started");

    if (!req.body) {
        context.res = {
            status: 400,
            body: { error: "Request body is required. (req.body is undefined)" }
        };
        return;
    }

    const apiUrl = `${process.env.HTS_SIMU_DOMAIN}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?` +
        `FID_COND_MRKT_DIV_CODE=J&` +
        `FID_INPUT_ISCD=${req.body.FID_INPUT_ISCD}&` +
        `FID_INPUT_DATE_1=${req.body.FID_INPUT_DATE_1}&` + // 조회 시작일자
        `FID_INPUT_DATE_2=${req.body.FID_INPUT_DATE_2}&` + // 
        `FID_PERIOD_DIV_CODE=${req.body.FID_PERIOD_DIV_CODE}&` + // D:일봉 W:주봉, M:월봉, Y:년봉
        `FID_ORG_ADJ_PRC=${req.body.FID_ORG_ADJ_PRC}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'appkey': process.env.APP_KEY,
                'appsecret': process.env.APP_SECRET,
                'tr_id': "FHKST03010100",
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