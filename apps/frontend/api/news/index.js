const fetch = require('node-fetch');
const fs = require("fs");
const path = require("path");

module.exports = async function (context, req) {

    context.log("news function started");

    if (!req.body) {
        context.res = {
            status: 400,
            body: { error: "Request body is required. (req.body is undefined)" }
        };
        return;
    }

    const apiUrl = `https://openapi.naver.com/v1/search/news?` +
        `query=${req.body.query}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Naver-Client-Id': process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_API_CLIENT_SECRET
            }
        });

        const text = await response.text();
        context.log("RAW RESPONSE:", text);

        try {
            const data = JSON.parse(text);

            // news_list.json 절대 경로 생성
            const configPath = path.join(__dirname, "news_list.json");

            // 파일 읽기
            const raw = fs.readFileSync(configPath, "utf8");
            const news_list = JSON.parse(raw);

            context.log("Loaded news_list:", news_list);

            // data.items.array.forEach(element => {
                
            // });

            context.res = { status: 200, body: data };
        } catch (e) {
            context.log("JSON parse error:", text);
            context.res = { status: 500, body: "INVALID_JSON_RESPONSE" };
        }
    } catch (error) {
        context.res = { status: 500, body: { error: error.message } };
    }
};