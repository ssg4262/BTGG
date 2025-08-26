// src/hooks/useBinancePrice.ts
import useSWR from "swr";

interface BinanceTicker {
    symbol: string;
    price: string;
}

const fetcher = async (url: string): Promise<BinanceTicker> => {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`Binance fetch failed`);
    return r.json();
};

// BTC/USDT 현재가
export const useBinancePrice = () => {
    const { data, error, isLoading } = useSWR(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
        fetcher,
        { refreshInterval: 360_000 }
    );

    const price = data ? parseFloat(data.price) : null;
    return { price, error, isLoading };
};
