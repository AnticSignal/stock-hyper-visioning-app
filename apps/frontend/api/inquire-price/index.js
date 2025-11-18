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

    // 주식현재가 시세
    const apiUrl = `${process.env.HTS_SIMU_DOMAIN}/uapi/domestic-stock/v1/quotations/inquire-price?` +
        `FID_COND_MRKT_DIV_CODE=J&` +
        `FID_INPUT_ISCD=${req.body.FID_INPUT_ISCD}&`

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'appkey': process.env.APP_KEY,
                'appsecret': process.env.APP_SECRET,
                'tr_id': "FHKST01010100",
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