// src/hooks/useBitcoin.ts
import useSWR from "swr";
import { coingeckoMarketChartUrl, sliceOneHour, toPoints, Point, RangeKey } from "@/lib/crypto";

const fetcher = async (url: string): Promise<{ prices: [number, number][] }> => {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
    return r.json();
};

export const useBitcoin = (range: RangeKey) => {
    const { data, error, isLoading } = useSWR(coingeckoMarketChartUrl(range), fetcher, {
        refreshInterval: 360_000,   // ✅ 3분으로 늘림
        revalidateOnFocus: false,
    });

    const series: Point[] = data ? sliceOneHour(toPoints(data), range) : [];
    return { series, error, isLoading };
};
