// src/hooks/useBitcoinInfo.ts
import useSWR from "swr";
import { coingeckoCoinInfoUrl, CoinInfo } from "@/lib/crypto";

const fetcher = async (url: string): Promise<CoinInfo> => {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
    return r.json();
};

export const useBitcoinInfo = () => {
    // 60초 폴링
    const { data, error, isLoading } = useSWR<CoinInfo>(coingeckoCoinInfoUrl, fetcher, {
        refreshInterval: 60_000,
        revalidateOnFocus: false,
    });

    return { info: data, error, isLoading };
};