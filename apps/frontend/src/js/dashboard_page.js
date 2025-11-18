// ===== 더미 데이터 =====
console.log("✅ app.js loaded");

/** stockInfo
 * 
 * rprs_mrkt_kor_name	대표 시장 한글 명
 * stck_prpr	주식 현재가
 * prdy_vrss	전일 대비
 * prdy_vrss_sign	전일 대비 부호
 * prdy_ctrt	전일 대비율
 * acml_tr_pbmn	누적 거래 대금 (거래대금)
 * acml_vol	누적 거래량 (거래량)
 * stck_oprc	주식 시가2 (시가)
 * stck_hgpr	주식 최고가 (고가)
 * stck_lwpr	주식 최저가 (저가)
 * stck_mxpr	주식 상한가
 * stck_llam	주식 하한가
 * stck_sdpr	주식 기준가 (전일 종가)
 * w52_hgpr	52주일 최고가
 * w52_lwpr	52주일 최저가
 * stck_shrn_iscd	주식 단축 종목코드
 * 
 * **/

const stockInfo = {
  name: "제영솔루텍",
  stck_shrn_iscd: "049630",
  rprs_mrkt_kor_name: "KOSDAQ",
  bstp_kor_isnm: "반도체/장비",
  stck_prpr: 6230,
  prdy_vrss_sign: "2",
  prdy_vrss: 430,
  prdy_ctrt: 7.41,
  stck_oprc: 5800,
  stck_sdpr: 5800,
  stck_hgpr: 6450,
  stck_lwpr: 5700,
  acml_vol: 12345678,
  acml_tr_pbmn: 98765,
  w52_hgpr: 7800,
  w52_lwpr: 3200,
};

const investorBars = [
  { type: "개인", value: 2293, isPositive: true },
  { type: "외국인", value: -1883, isPositive: false },
  { type: "기관", value: -4080, isPositive: false },
];

// 현재 종목이 속한 섹터에 대한 요약 정보 (섹터 평균 등락률)
const sectorSummary = {
  sectorChange: 3.45, // 섹터 평균 등락률 (%)
};

const newsItems = [
  {
    id: 1,
    title: "제영솔루텍, 3분기 실적 예상치 상회...영업이익 15% 증가",
    source: "한국경제",
    time: "2시간 전",
    sentiment: "긍정",
  },
  {
    id: 2,
    title: "반도체 장비 수요 급증, 관련주 강세 지속 전망",
    source: "매일경제",
    time: "4시간 전",
    sentiment: "긍정",
  },
  {
    id: 3,
    title: "외국인 투자자, 이틀 연속 순매도...시장 불안 가중",
    source: "연합뉴스",
    time: "5시간 전",
    sentiment: "부정",
  },
  {
    id: 4,
    title: "제영솔루텍, 신규 해외 계약 체결...연말까지 실적 개선 기대",
    source: "서울경제",
    time: "7시간 전",
    sentiment: "긍정",
  },
  {
    id: 5,
    title: "업계 전반 원자재 가격 상승...수익성 악화 우려",
    source: "이데일리",
    time: "9시간 전",
    sentiment: "부정",
  },
  {
    id: 6,
    title: "코스닥 기술주 강세...반도체·2차전지 동반 상승",
    source: "헤럴드경제",
    time: "어제",
    sentiment: "긍정",
  },
  {
    id: 7,
    title: "글로벌 반도체 업황 둔화 조짐...투자심리 위축",
    source: "머니투데이",
    time: "어제",
    sentiment: "부정",
  },
  {
    id: 8,
    title: "제영솔루텍, AI 서버용 부품 공급 확대 소식에 강세",
    source: "조선비즈",
    time: "1일 전",
    sentiment: "긍정",
  },
  {
    id: 9,
    title: "기관, IT·부품주 차익 실현 매도...단기 조정 가능성",
    source: "매일경제",
    time: "1일 전",
    sentiment: "부정",
  },
  {
    id: 10,
    title: "연말 배당 기대감에 중소형 기술주 매수세 유입",
    source: "한국경제",
    time: "2일 전",
    sentiment: "긍정",
  },
];


const vitalityData = {
  overall: 78,
  volumeScore: 85,
  priceVolatility: 72,
  marketInterest: 81,
};

// 기간별 차트용 더미 (가격 + 거래량 같이)
function getChartData(period) {
  if (period === "1D") {
    return {
      labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
      prices: [5800, 5950, 6020, 6100, 6200, 6300, 6230],
      volumes: [6000000, 6200000, 5800000, 6100000, 5500000, 4200000, 3800000],
    };
  }
  if (period === "1W") {
    return {
      labels: ["월", "화", "수", "목", "금"],
      prices: [5420, 5600, 5750, 5900, 6230],
      volumes: [4200000, 5100000, 4800000, 5300000, 6000000],
    };
  }
  if (period === "1M") {
    return {
      labels: ["1주차", "2주차", "3주차", "4주차"],
      prices: [5100, 5400, 5800, 6230],
      volumes: [3800000, 4200000, 5100000, 6000000],
    };
  }
  if (period === "3M") {
    return {
      labels: ["-3M", "-2M", "-1M", "현재"],
      prices: [4300, 4800, 5400, 6230],
      volumes: [3200000, 3500000, 4200000, 5800000],
    };
  }
  // 1Y
  return {
    labels: ["-1Y", "-9M", "-6M", "-3M", "현재"],
    prices: [3200, 3800, 4500, 5200, 6230],
    volumes: [2500000, 2800000, 3200000, 3800000, 5800000],
  };
}

// ===== 렌더링 함수 =====

function renderStockHeader(info) {
  document.getElementById("stock-sector-badge").textContent = info.bstp_kor_isnm;
  document.getElementById("stock-name-main").textContent = info.name;
  document.getElementById("stock-code-main").textContent =
    `${info.stck_shrn_iscd} · ${info.rprs_mrkt_kor_name}`;
  document.getElementById("stock-price-main").textContent =
    info.stck_prpr.toLocaleString();

  const changeEl = document.getElementById("stock-change-main");
  const sign = info.prdy_vrss_sign === "2" ? "+" : "-";
  const cls = info.prdy_vrss_sign === "2" ? "text-danger" : "text-primary";
  changeEl.classList.add(cls);
  changeEl.textContent =
    `${sign}${Math.abs(info.prdy_vrss).toLocaleString()} (${sign}${Math.abs(info.prdy_ctrt)}%)`;
}

function putCommaToNum(target) {
  return typeof target === 'number' ? target.toLocaleString() : Number(target).toLocaleString();
}

function renderMetrics(info) {
  document.getElementById("metric-open").textContent =
    putCommaToNum(info.stck_oprc);
  document.getElementById("metric-prev-close").textContent =
    putCommaToNum(info.stck_sdpr);
  document.getElementById("metric-volume").textContent =
    putCommaToNum(info.acml_vol);
  var acml_tr_pbmn = typeof info.acml_tr_pbmn === 'number' ? info.acml_tr_pbmn : Number(info.acml_tr_pbmn);
  if(acml_tr_pbmn > 1000000) acml_tr_pbmn = (acml_tr_pbmn/1000000).toFixed(2);
  document.getElementById("metric-trading-value").textContent =
    putCommaToNum(acml_tr_pbmn);

  document.getElementById("metric-high").textContent =
    putCommaToNum(info.stck_hgpr);
  document.getElementById("metric-low").textContent =
    putCommaToNum(info.stck_lwpr);
  document.getElementById("metric-52w").textContent =
    `${putCommaToNum(info.w52_hgpr)} / ${putCommaToNum(info.w52_lwpr)}`;
}

function renderInvestorBars(data) {
  const container = document.getElementById("investor-bars");
  container.innerHTML = "";
  const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)));

  data.forEach((trend) => {
    const row = document.createElement("div");
    row.className = "investor-row";

    const label = document.createElement("div");
    label.className = "investor-label";
    label.textContent = trend.type;

    const barArea = document.createElement("div");
    barArea.className = "investor-bar-area";

    const halfLeft = document.createElement("div");
    halfLeft.className = "investor-half investor-half-left";

    const axis = document.createElement("div");
    axis.className = "investor-axis";

    const halfRight = document.createElement("div");
    halfRight.className = "investor-half investor-half-right";

    const percentage = (Math.abs(trend.value) / maxAbs) * 50; // 한쪽 최대 50%

    // 음수 → 왼쪽 파란색
    if (!trend.isPositive) {
      const barNeg = document.createElement("div");
      barNeg.className = "investor-bar-fill negative";
      barNeg.style.width = `${percentage}%`;
      halfLeft.appendChild(barNeg);
    }

    // 양수 → 오른쪽 빨간색
    if (trend.isPositive) {
      const barPos = document.createElement("div");
      barPos.className = "investor-bar-fill positive";
      barPos.style.width = `${percentage}%`;
      halfRight.appendChild(barPos);
    }

    barArea.appendChild(halfLeft);
    barArea.appendChild(axis);
    barArea.appendChild(halfRight);

    const value = document.createElement("div");
    value.className =
      "investor-value " +
      (trend.isPositive ? "text-danger" : "text-primary");
    value.textContent =
      (trend.isPositive ? "+" : "") + trend.value.toLocaleString();

    row.appendChild(label);
    row.appendChild(barArea);
    row.appendChild(value);

    container.appendChild(row);
  });
}

// 🔵 해당 섹터 등락률 렌더링
function renderSectorSummary(info, summary) {
  const container = document.getElementById("sector-summary");
  const sectorChange = summary.sectorChange;
  const stockChange = info.prdy_ctrt;

  const sectorSign = sectorChange >= 0 ? "+" : "-";
  const sectorColorClass = sectorChange >= 0 ? "text-danger" : "text-primary";
  const sectorArrow = sectorChange >= 0 ? "↗" : "↘";

  const stockSign = stockChange >= 0 ? "+" : "-";
  const stockColorClass = stockChange >= 0 ? "text-danger" : "text-primary";

  container.innerHTML = `
    <div class="sector-summary-card">
      <div class="sector-summary-header">
        <div>
          <div class="sector-summary-name">${info.bstp_kor_isnm}</div>
          <div class="sector-summary-tag">섹터 평균</div>
        </div>
        <div class="sector-summary-sector-change ${sectorColorClass}">
          <span>${sectorArrow}</span>
          <span>${sectorSign}${Math.abs(sectorChange).toFixed(2)}%</span>
        </div>
      </div>
      <hr class="sector-summary-divider">
      <div class="d-flex justify-content-between align-items-center">
        <span class="sector-summary-tag">종목 등락률</span>
        <span class="sector-summary-stock-change ${stockColorClass}">
          ${stockSign}${Math.abs(stockChange).toFixed(2)}%
        </span>
      </div>
    </div>
  `;
}

function renderNews(items) {
  const container = document.getElementById("news-list");
  container.innerHTML = "";

  // 👉 최대 10개까지만 표시
  const limited = items.slice(0, 10);

  items.forEach((n) => {
    const div = document.createElement("div");
    div.className = "news-item";

    // 감성에 따라 클래스 결정
    const sentimentClass =
    n.sentiment === "긍정" ? "sentiment-positive" : "sentiment-negative";

    div.innerHTML = `
      <div>
        <div class="font-weight-bold mb-1">${n.title}</div>
        <div class="news-meta">
          <span>${n.source}</span>
          <span> · </span>
          <span>${n.time}</span>
        </div>
      </div>
      <span class="sentiment-badge ${sentimentClass}">
        ${n.sentiment}
      </span>
    `;
    container.appendChild(div);
  });
}

function renderVitality(v) {
  const badge = document.getElementById("vitality-score-badge");
  let level = "보통";
  if (v.overall >= 80) level = "높음";
  if (v.overall < 50) level = "낮음";
  badge.textContent = `${v.overall}점 · ${level}`;

  document.getElementById("vitality-volume-label").textContent =
    `${v.volumeScore}점`;
  document.getElementById("vitality-volatility-label").textContent =
    `${v.priceVolatility}점`;
  document.getElementById("vitality-interest-label").textContent =
    `${v.marketInterest}점`;

  document.getElementById("vitality-volume-bar").style.width =
    `${v.volumeScore}%`;
  document.getElementById("vitality-volatility-bar").style.width =
    `${v.priceVolatility}%`;
  document.getElementById("vitality-interest-bar").style.width =
    `${v.marketInterest}%`;
}

// ===== Chart.js =====

let priceChart = null;
let volumeChart = null;

function renderCharts(period) {
  const priceCtx = document.getElementById("priceChart").getContext("2d");
  const volumeCtx = document.getElementById("volumeChart").getContext("2d");
  const data = getChartData(period);

  if (priceChart) priceChart.destroy();
  if (volumeChart) volumeChart.destroy();

  // 🔴 가격 차트용 그라디언트
  const priceGradient = priceCtx.createLinearGradient(
    0,
    0,
    0,
    priceCtx.canvas.height || 200
  );
  priceGradient.addColorStop(0, "rgba(239, 68, 68, 0.35)");
  priceGradient.addColorStop(1, "rgba(239, 68, 68, 0)");

  priceChart = new Chart(priceCtx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.prices,
          fill: true,
          backgroundColor: priceGradient,
          borderColor: "#ef4444",
          borderWidth: 2,
          lineTension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "#ef4444",
          pointBorderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { maxRotation: 0, minRotation: 0, padding: 8 },
          },
        ],
        yAxes: [
          {
            ticks: {
              padding: 8,
              callback: (value) => value.toLocaleString(),
            },
            gridLines: { color: "#e5e7eb" },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem) =>
            tooltipItem.yLabel.toLocaleString() + "원",
        },
      },
      layout: {
        padding: { left: 0, right: 8, top: 10, bottom: 10 },
      },
    },
  });

  // 🔵 거래량 차트용 그라디언트
  const volumeGradient = volumeCtx.createLinearGradient(
    0,
    0,
    0,
    volumeCtx.canvas.height || 150
  );
  volumeGradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
  volumeGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

  volumeChart = new Chart(volumeCtx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.volumes,
          fill: true,
          backgroundColor: volumeGradient,
          borderColor: "#3b82f6",
          borderWidth: 1.5,
          lineTension: 0.3,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { maxRotation: 0, minRotation: 0, padding: 8 },
          },
        ],
        yAxes: [
          {
            ticks: {
              padding: 8,
              callback: (value) =>
                (value / 1000000).toFixed(1) + "M",
            },
            gridLines: { color: "#e5e7eb" },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem) =>
            tooltipItem.yLabel.toLocaleString(),
        },
      },
      layout: {
        padding: { left: 0, right: 8, top: 5, bottom: 5 },
      },
    },
  });
}

function setupPeriodButtons() {
  const buttons = document.querySelectorAll(".period-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const period = btn.getAttribute("data-period");
      renderCharts(period);
    });
  });
}

// ===== 초기화 =====

document.addEventListener("DOMContentLoaded", () => {
  renderStockHeader(stockInfo);
  renderMetrics(stockInfo);
  renderInvestorBars(investorBars);
  renderSectorSummary(stockInfo, sectorSummary);
  renderNews(newsItems);
  renderVitality(vitalityData);
  renderCharts("1D");
  setupPeriodButtons();
});
