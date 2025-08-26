// src/lib/crypto.ts
export type RangeKey = "All" | "1y" | "30d" | "7d" | "1d" | "1h";

export interface Point { t: number; p: number } // timestamp(ms), price(USD)

/** CoinGecko market_chart URL */
export const coingeckoMarketChartUrl = (rk: RangeKey): string => {
    if (rk === "All") return "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max";
    const days = rk === "1h" ? 1 : rk === "1d" ? 1 : rk === "7d" ? 7 : rk === "30d" ? 30 : 365;
    return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`;
};

/** Coin 상세 정보 URL (아이콘/가격/시총/볼륨 등) */
export const coingeckoCoinInfoUrl =
    "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";

/** market_chart → Point[] */
export const toPoints = (resp: { prices: [number, number][] }): Point[] =>
    resp.prices.map(([t, p]) => ({ t, p }));

/** 1시간 범위는 1일 데이터에서 추가 슬라이스 */
export const sliceOneHour = (data: Point[], rk: RangeKey): Point[] => {
    if (rk !== "1h") return data;
    const end = data.at(-1)?.t ?? Date.now();
    const start = end - 60 * 60 * 1000;
    return data.filter((d) => d.t >= start);
};

/** Coin 정보 타입(필요 필드만) */
export interface CoinInfo {
    id: string;
    symbol: string;
    name: string;
    image: { thumb: string; small: string; large: string };
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
        price_change_percentage_24h: number;
    };
}
