// src/components/chart/MarketChartPanel.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
    TooltipProps,
} from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import {
    Copy,
    Menu,
    Globe,
    Twitter,
    Send,
    LineChart as LineIcon,
    BarChart3,
    Settings,
} from "lucide-react";

/* ─────────────────── Settings ───────────────────
   이 두 값만 바꾸면 다른 코인을 그대로 적용 가능 */
const BINANCE_SYMBOL = "BTCUSDT";  // 예: ETHUSDT
const COINGECKO_ID  = "bitcoin";   // 예: ethereum

/* ─────────────────── Types ─────────────────── */
type RangeKey = "All" | "1y" | "30d" | "7d" | "1d" | "1h";

interface Candle {
    t: number; o: number; h: number; l: number; c: number; v: number;
}

interface HeaderMeta {
    name: string;
    symbol: string;
    chainBadge: string;
    typeBadge: string;
    logoUrl: string;
    siteUrl?: string;
    twitterUrl?: string;
    telegramUrl?: string;
}

/* ─────────────────── Fetch (Binance) ─────────────────── */
const RANGE_TO_BINANCE: Record<
    RangeKey,
    { interval: "1m" | "5m" | "15m" | "1h" | "4h" | "1d"; limit: number }
> = {
    "1h":  { interval: "1m",  limit: 60 },
    "1d":  { interval: "15m", limit: 96 },
    "7d":  { interval: "1h",  limit: 7 * 24 },
    "30d": { interval: "4h",  limit: 30 * 6 },
    "1y":  { interval: "1d",  limit: 365 },
    "All": { interval: "1d",  limit: 1000 },
};

const binanceUrl = (rk: RangeKey) => {
    const { interval, limit } = RANGE_TO_BINANCE[rk];
    return `https://api.binance.com/api/v3/klines?symbol=${BINANCE_SYMBOL}&interval=${interval}&limit=${limit}`;
};

const fetchKlines = async (url: string): Promise<Candle[]> => {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`Binance error: ${r.status}`);
    const raw = (await r.json()) as [number, string, string, string, string, string, number][];
    return raw.map((k) => ({
        t: k[0],
        o: parseFloat(k[1]),
        h: parseFloat(k[2]),
        l: parseFloat(k[3]),
        c: parseFloat(k[4]),
        v: parseFloat(k[5]),
    }));
};

/* ─────────────────── Fetch (CoinGecko /coins/{id}) ───────────────────
   CORS 회피를 위해 기본 경로를 '/cg' 로 설정 (Vite/Next 프록시 사용 권장) */
const CG_BASE = "/cg"; // 필요시 'https://api.coingecko.com' 으로 바꾸되 CORS 주의

type CgInfo = {
    name: string;
    symbol: string;
    image?: { small?: string };
    links?: {
        homepage?: string[];
        twitter_screen_name?: string | null;
        telegram_channel_identifier?: string | null;
    };
    asset_platform_id?: string | null;
    detail_platforms?: Record<string, unknown> | null;
    market_data?: {
        market_cap?: { usd?: number };
        total_volume?: { usd?: number };
        current_price?: { usd?: number };
        price_change_percentage_24h?: number;
    };
};

const fetchCgInfo = async (id: string): Promise<CgInfo> => {
    const url =
        `${CG_BASE}/api/v3/coins/${id}` +
        `?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`CoinGecko error: ${r.status}`);
    return r.json();
};

/* ─────────────────── Helpers ─────────────────── */
const nfUSD = (n: number): string =>
    n >= 1 ? `$${n.toLocaleString()}` : `$${n.toLocaleString(undefined, { maximumSignificantDigits: 6 })}`;

const nfUSDCompact = (n: number): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
    }).format(n);

const pct = (n: number): string => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

const tickDate = (ts: number): string => {
    const d = new Date(ts);
    return `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`;
};

const sma = (arr: number[], period: number): Array<number | null> =>
    arr.map((_, i) =>
        i + 1 < period ? null : arr.slice(i + 1 - period, i + 1).reduce((a, b) => a + b, 0) / period
    );

const ema = (arr: number[], period: number): Array<number | null> => {
    const k = 2 / (period + 1);
    const out: Array<number | null> = [];
    arr.forEach((v, i) => (i === 0 ? out.push(v) : out.push(((out[i - 1] as number) * (1 - k) + v * k))));
    for (let i = 0; i < Math.min(period - 1, out.length); i++) out[i] = null;
    return out;
};

/* ─────────────────── Hooks ─────────────────── */
const useIsMobile = () => {
    const [m, setM] = useState<boolean>(() => (typeof window !== "undefined" ? window.innerWidth < 640 : false));
    useEffect(() => {
        const onR = () => setM(window.innerWidth < 640);
        window.addEventListener("resize", onR);
        return () => window.removeEventListener("resize", onR);
    }, []);
    return m;
};

/* ─────────────────── Tooltip ─────────────────── */
// @ts-ignore
const ChartTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    const d = new Date(label as number);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const price = (payload[0].payload as Candle & { sma7?: number | null }).c;
    return (
        <div className="rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs text-white backdrop-blur">
            <div className="mb-1 font-semibold">
                {d.getFullYear()}.{d.getMonth() + 1}.{d.getDate()} {hh}:{mm}
            </div>
            <div className="flex items-center gap-2">
                <span className="text-white/60">가격</span>
                <b>{nfUSD(price)}</b>
            </div>
        </div>
    );
};

/* ─────────────────── Header (Toolbar) ─────────────────── */
const Toolbar: React.FC<{
    meta: HeaderMeta;
    range: RangeKey;
    onRange: (rk: RangeKey) => void;
}> = ({ meta, range, onRange }) => {
    const pill = (active: boolean) =>
        `h-8 rounded-md px-2 text-xs font-semibold transition ${
            active ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
        }`;

    return (
        <div className="flex items-center gap-3 min-w-0">
            <img
                src={meta.logoUrl}
                alt={meta.symbol}
                className="size-9 rounded-full border border-white/10 object-contain bg-black/20 shrink-0"
            />

            <div className="text-lg sm:text-xl font-semibold truncate">
                {meta.name} <span className="text-white/60">{meta.symbol}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 ml-1 shrink-0">
                <span className="rounded bg-white/10 px-2 py-[2px] text-[11px]">{meta.symbol}</span>
                <span className="rounded bg-white/10 px-2 py-[2px] text-[11px]">{meta.chainBadge}</span>
                <span className="rounded bg-white/10 px-2 py-[2px] text-[11px]">{meta.typeBadge}</span>
            </div>

            <div className="ml-auto flex items-center gap-2 text-white/80 shrink-0">
                <button className="hidden md:inline-flex size-8 items-center justify-center rounded-md bg-white/5 hover:bg-white/10" title="복사">
                    <Copy className="h-4 w-4" />
                </button>
                <button className="hidden md:inline-flex size-8 items-center justify-center rounded-md bg-white/5 hover:bg-white/10" title="메뉴">
                    <Menu className="h-4 w-4" />
                </button>
                {meta.siteUrl && (
                    <a href={meta.siteUrl} target="_blank" className="size-8 grid place-items-center rounded-md bg-white/5 hover:bg-white/10" title="웹사이트">
                        <Globe className="h-4 w-4" />
                    </a>
                )}
                {meta.twitterUrl && (
                    <a href={meta.twitterUrl} target="_blank" className="size-8 grid place-items-center rounded-md bg-white/5 hover:bg-white/10" title="X">
                        <Twitter className="h-4 w-4" />
                    </a>
                )}
                {meta.telegramUrl && (
                    <a href={meta.telegramUrl} target="_blank" className="size-8 grid place-items-center rounded-md bg-white/5 hover:bg-white/10" title="Telegram">
                        <Send className="h-4 w-4" />
                    </a>
                )}
            </div>

            {/* 범위 버튼: 모바일 가로 스크롤 */}
            <div className="ml-2 flex gap-1 overflow-x-auto no-scrollbar shrink-0">
                {(["All", "1y", "30d", "7d", "1d", "1h"] as RangeKey[]).map((rk) => (
                    <button key={rk} onClick={() => onRange(rk)} className={pill(range === rk)}>
                        {rk}
                    </button>
                ))}
            </div>

            <div className="ml-1 hidden sm:flex items-center gap-1 shrink-0">
        <span className="size-8 grid place-items-center rounded-md bg-white/5">
          <LineIcon className="h-4 w-4" />
        </span>
                <span className="size-8 grid place-items-center rounded-md bg-white/5">
          <Settings className="h-4 w-4" />
        </span>
            </div>
        </div>
    );
};

/* ─────────────────── Main ─────────────────── */
export const MarketChartPanel: React.FC = () => {
    const [range, setRange] = useState<RangeKey>("1d");
    const [useLog, setUseLog] = useState(false);
    const [showVolume, setShowVolume] = useState(true);
    const [showSMA, setShowSMA] = useState(true);
    const [showEMA, setShowEMA] = useState(true);
    const isMobile = useIsMobile();

    // Binance 차트 데이터
    const { data: candles = [], error, isLoading } = useSWR(binanceUrl(range), fetchKlines, {
        refreshInterval: 180_000,
        revalidateOnFocus: false,
    });

    // CoinGecko 메타 데이터
    const { data: cg, error: cgErr, isLoading: cgLoading } = useSWR<CgInfo>(
        ["cg", COINGECKO_ID],
        () => fetchCgInfo(COINGECKO_ID),
        { refreshInterval: 180_000, revalidateOnFocus: false }
    );

    // 헤더 메타(실데이터)
    const meta: HeaderMeta = useMemo(() => {
        const homepage = cg?.links?.homepage?.find((x) => x && x.trim().length > 0) ?? undefined;
        const twitter = cg?.links?.twitter_screen_name ? `https://twitter.com/${cg.links.twitter_screen_name}` : undefined;
        const telegram = cg?.links?.telegram_channel_identifier ? `https://t.me/${cg.links.telegram_channel_identifier}` : undefined;

        const chain =
            cg?.asset_platform_id?.toUpperCase() ??
            (cg?.name?.toUpperCase().includes("BITCOIN") ? "BITCOIN" : "NATIVE");

        const type = cg?.detail_platforms && Object.keys(cg.detail_platforms).length > 0 ? "TOKEN" : "COIN";

        return {
            name: cg?.name ?? BINANCE_SYMBOL.replace("USDT", ""),
            symbol: (cg?.symbol ?? BINANCE_SYMBOL.slice(0, -4)).toUpperCase(),
            chainBadge: chain,
            typeBadge: type,
            logoUrl: cg?.image?.small ?? "/favicon.ico",
            siteUrl: homepage,
            twitterUrl: twitter,
            telegramUrl: telegram,
        };
    }, [cg]);

    // 지표 계산
    const closes = useMemo(() => candles.map((d) => d.c), [candles]);
    const sma7 = useMemo(() => sma(closes, 7), [closes]);
    const ema25 = useMemo(() => ema(closes, 25), [closes]);
    const chartData = useMemo(
        () =>
            candles.map((d, i) => ({
                ...d,
                sma7: sma7[i],
                ema25: ema25[i],
            })),
        [candles, sma7, ema25]
    );

    const last = candles.at(-1)?.c ?? (cg?.market_data?.current_price?.usd ?? 0);
    const first = candles[0]?.c ?? last;
    const diffPct = cg?.market_data?.price_change_percentage_24h ?? ((last - first) / (first || 1)) * 100;

    // 팔레트
    const pal = {
        shell: "bg-black text-white",
        grid: "rgba(255,255,255,0.06)",
        axis: "rgba(255,255,255,0.10)",
        tick: "rgba(255,255,255,0.65)",
        line: "#ff5b5b",
        areaTop: "rgba(239,68,68,.22)",
        areaBottom: "rgba(239,68,68,.02)",
    };

    return (
        <section className={`rounded-2xl ${pal.shell} p-3 sm:p-4 min-w-0`}>
            <Toolbar meta={meta} range={range} onRange={setRange} />

            {/* 현재가/상태 */}
            <div className="mt-3 flex items-center gap-2">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">{nfUSD(last)}</div>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        diffPct >= 0 ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
                    }`}
                >
          {pct(diffPct)}
        </span>
                <div className="ml-auto flex flex-wrap items-center gap-2 text-xs shrink-0">
                    <button onClick={() => setUseLog((s) => !s)} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10" title="축 스케일">
                        {useLog ? "로그" : "선형"}
                    </button>
                    <button onClick={() => setShowVolume((s) => !s)} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10 flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" /> 거래량
                    </button>
                    <button onClick={() => setShowSMA((s) => !s)} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10">
                        SMA 7
                    </button>
                    <button onClick={() => setShowEMA((s) => !s)} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10">
                        EMA 25
                    </button>
                    {(isLoading || cgLoading) && <span className="text-white/60">갱신 중…</span>}
                    {(error || cgErr) && <span className="text-rose-400">데이터 오류</span>}
                </div>
            </div>

            {/* 차트 */}
            <div className="mt-2 rounded-xl bg-black p-2 sm:p-3 overflow-hidden min-w-0">
                <div className="h-[220px] sm:h-[340px]">
                    <ResponsiveContainer>
                        <ComposedChart
                            data={chartData}
                            margin={
                                isMobile
                                    ? { top: 6, left: 6, right: 6, bottom: 0 }
                                    : { top: 8, left: 8, right: 8, bottom: 0 }
                            }
                        >
                            <CartesianGrid stroke={pal.grid} vertical={false} />
                            <XAxis
                                dataKey="t"
                                interval="preserveStartEnd"
                                tickFormatter={(v) => tickDate(v as number)}
                                tick={{ fill: pal.tick, fontSize: isMobile ? 10 : 12 }}
                                axisLine={{ stroke: pal.axis }}
                                tickLine={false}
                                minTickGap={isMobile ? 10 : 26}
                                tickMargin={isMobile ? 6 : 8}
                            />
                            <YAxis
                                yAxisId="price"
                                dataKey="c"
                                width={isMobile ? 56 : 70}
                                scale={useLog ? "log" : "auto"}
                                tick={{ fill: pal.tick, fontSize: isMobile ? 10 : 12 }}
                                axisLine={{ stroke: pal.axis }}
                                tickLine={false}
                                tickFormatter={(n: number) => (isMobile ? nfUSDCompact(n) : n < 1 ? n.toExponential(2) : `$${n.toLocaleString()}`)}
                            />
                            {showVolume && <YAxis yAxisId="vol" hide domain={[0, "auto"]} />}

                            <Tooltip content={<ChartTooltip />} />
                            <ReferenceLine yAxisId="price" y={first} stroke={pal.axis} strokeDasharray="3 3" />

                            <defs>
                                <linearGradient id="areaRed" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor={pal.areaTop} />
                                    <stop offset="100%" stopColor={pal.areaBottom} />
                                </linearGradient>
                            </defs>

                            <Area
                                yAxisId="price"
                                type="monotone"
                                dataKey="c"
                                stroke={pal.line}
                                strokeWidth={2.2}
                                fill="url(#areaRed)"
                                dot={false}
                                isAnimationActive={false}
                            />

                            {showSMA && (
                                <Area
                                    yAxisId="price"
                                    type="monotone"
                                    dataKey="sma7"
                                    stroke="#34D399"
                                    strokeWidth={1.6}
                                    fillOpacity={0}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            )}
                            {showEMA && (
                                <Area
                                    yAxisId="price"
                                    type="monotone"
                                    dataKey="ema25"
                                    stroke="#A78BFA"
                                    strokeWidth={1.6}
                                    fillOpacity={0}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            )}

                            {showVolume && (
                                <Bar
                                    yAxisId="vol"
                                    dataKey="v"
                                    barSize={2}
                                    fill="rgba(255,255,255,0.18)"
                                    isAnimationActive={false}
                                />
                            )}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* 하단 메트릭: 실데이터 */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                        <div className="text-white/60">체인</div>
                        <div className="mt-1 font-semibold">{meta.chainBadge}</div>
                    </div>
                    <div>
                        <div className="text-white/60">시가총액</div>
                        <div className="mt-1 font-semibold">
                            {cg?.market_data?.market_cap?.usd != null ? nfUSD(cg.market_data.market_cap.usd!) : "—"}
                        </div>
                    </div>
                    <div>
                        <div className="text-white/60">24시간 거래량</div>
                        <div className="mt-1 font-semibold">
                            {cg?.market_data?.total_volume?.usd != null ? nfUSD(cg.market_data.total_volume.usd!) : "—"}
                        </div>
                    </div>
                    <div>
                        <div className="text-white/60">표시 통화</div>
                        <div className="mt-1 font-semibold">USD</div>
                    </div>
                </div>

                <div className="mt-4 text-xs text-white/50">
                    Source: Binance ({BINANCE_SYMBOL}) · Meta: CoinGecko ({COINGECKO_ID})
                </div>
            </div>
        </section>
    );
};
