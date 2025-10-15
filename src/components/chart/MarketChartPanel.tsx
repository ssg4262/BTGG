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
import type {
    ValueType,
    NameType,
} from "recharts/types/component/DefaultTooltipContent";
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

/* ─────────────────── Settings ─────────────────── */
const BINANCE_SYMBOL = "BTCUSDT"; // 예: ETHUSDT
const COINGECKO_ID = "bitcoin";   // 예: ethereum

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

type Binance24h = {
    priceChangePercent: string;
    lastPrice: string;
    volume: string;
    quoteVolume: string;
};

/* ─────────────────── Fetchers ─────────────────── */
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

const binanceKlinesUrl = (rk: RangeKey) => {
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

const binance24hUrl = `https://api.binance.com/api/v3/ticker/24hr?symbol=${BINANCE_SYMBOL}`;
const fetch24h = async (url: string): Promise<Binance24h> => {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`Binance 24h error: ${r.status}`);
    const j = await r.json();
    return {
        priceChangePercent: j.priceChangePercent,
        lastPrice: j.lastPrice,
        volume: j.volume,
        quoteVolume: j.quoteVolume,
    };
};

const isDev = import.meta.env.DEV;
const CG_BASE = isDev ? "/cg" : "";

const fetchCgInfo = async (id: string): Promise<CgInfo> => {
    if (!isDev) throw new Error("CG disabled in production");
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

const pctFmt = (n: number): string => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

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

const useIsMobile = () => {
    const [m, setM] = useState<boolean>(() => (typeof window !== "undefined" ? window.innerWidth < 640 : false));
    useEffect(() => {
        const onR = () => setM(window.innerWidth < 640);
        window.addEventListener("resize", onR);
        return () => window.removeEventListener("resize", onR);
    }, []);
    return m;
};

// 다크모드 감지 훅
const useDarkMode = () => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return isDark;
};

/* ─────────────────── Tooltip ─────────────────── */
type TTProps = TooltipProps<ValueType, NameType> & {
    payload?: Array<{ payload: Candle }>;
    label?: number;
};

const ChartTooltip: React.FC<TTProps & { isDark: boolean }> = ({ active, payload, label, isDark }) => {
    if (!active || !payload || payload.length === 0 || !label) return null;
    const d = new Date(label);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const price = (payload[0].payload as Candle).c;
    return (
        <div className={`rounded-lg border px-3 py-2 text-xs backdrop-blur ${
            isDark
                ? "border-white/10 bg-black/80 text-white"
                : "border-gray-200 bg-white/90 text-gray-900"
        }`}>
            <div className="mb-1 font-semibold">
                {d.getFullYear()}.{d.getMonth() + 1}.{d.getDate()} {hh}:{mm}
            </div>
            <div className="flex items-center gap-2">
                <span className={isDark ? "text-white/60" : "text-gray-600"}>가격</span>
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
    isDark: boolean;
}> = ({ meta, range, onRange, isDark }) => {
    const pill = (active: boolean) =>
        `h-8 rounded-md px-2 text-xs font-semibold transition ${
            active
                ? isDark ? "bg-white/10 text-white" : "bg-gray-200 text-gray-900"
                : isDark ? "bg-white/5 text-white/70 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`;

    const iconBtnClass = isDark
        ? "bg-white/5 hover:bg-white/10 text-white/80"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700";

    return (
        <div className="flex items-center gap-3 min-w-0">
            <div className="text-lg sm:text-xl font-semibold truncate">
                {meta.name} <span className={isDark ? "text-white/60" : "text-gray-500"}>{meta.symbol}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 ml-1 shrink-0">
                <span className={`rounded px-2 py-[2px] text-[11px] ${isDark ? "bg-white/10" : "bg-gray-200 text-gray-700"}`}>
                    {meta.symbol}
                </span>
                <span className={`rounded px-2 py-[2px] text-[11px] ${isDark ? "bg-white/10" : "bg-gray-200 text-gray-700"}`}>
                    {meta.chainBadge}
                </span>
                <span className={`rounded px-2 py-[2px] text-[11px] ${isDark ? "bg-white/10" : "bg-gray-200 text-gray-700"}`}>
                    {meta.typeBadge}
                </span>
            </div>

            <div className="ml-auto flex items-center gap-2 shrink-0">
                <button className={`hidden md:inline-flex size-8 items-center justify-center rounded-md ${iconBtnClass}`} title="복사">
                    <Copy className="h-4 w-4" />
                </button>
                <button className={`hidden md:inline-flex size-8 items-center justify-center rounded-md ${iconBtnClass}`} title="메뉴">
                    <Menu className="h-4 w-4" />
                </button>
                {meta.siteUrl && (
                    <a href={meta.siteUrl} target="_blank" className={`size-8 grid place-items-center rounded-md ${iconBtnClass}`} title="웹사이트">
                        <Globe className="h-4 w-4" />
                    </a>
                )}
                {meta.twitterUrl && (
                    <a href={meta.twitterUrl} target="_blank" className={`size-8 grid place-items-center rounded-md ${iconBtnClass}`} title="X">
                        <Twitter className="h-4 w-4" />
                    </a>
                )}
                {meta.telegramUrl && (
                    <a href={meta.telegramUrl} target="_blank" className={`size-8 grid place-items-center rounded-md ${iconBtnClass}`} title="Telegram">
                        <Send className="h-4 w-4" />
                    </a>
                )}
            </div>

            <div className="ml-2 flex gap-1 overflow-x-auto no-scrollbar shrink-0">
                {(["All", "1y", "30d", "7d", "1d", "1h"] as RangeKey[]).map((rk) => (
                    <button key={rk} onClick={() => onRange(rk)} className={pill(range === rk)}>
                        {rk}
                    </button>
                ))}
            </div>

            <div className="ml-1 hidden sm:flex items-center gap-1 shrink-0">
                <span className={`size-8 grid place-items-center rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                    <LineIcon className="h-4 w-4" />
                </span>
                <span className={`size-8 grid place-items-center rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
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
    const [showVolume, setShowVolume] = useState(false);
    const [showSMA, setShowSMA] = useState(false);
    const [showEMA, setShowEMA] = useState(false);
    const isMobile = useIsMobile();
    const isDark = useDarkMode();

    const { data: candles = [], error, isLoading } = useSWR(
        binanceKlinesUrl(range),
        fetchKlines,
        { refreshInterval: 180_000, revalidateOnFocus: false }
    );

    const { data: stat } = useSWR<Binance24h>(
        binance24hUrl,
        fetch24h,
        { refreshInterval: 180_000, revalidateOnFocus: false }
    );

    const { data: cg } = useSWR<CgInfo>(
        isDev ? ["cg", COINGECKO_ID] : null,
        () => fetchCgInfo(COINGECKO_ID),
        { refreshInterval: 180_000, revalidateOnFocus: false }
    );

    const meta: HeaderMeta = useMemo(() => {
        if (cg) {
            const homepage = cg.links?.homepage?.find((x) => x && x.trim().length > 0) ?? undefined;
            const twitter = cg.links?.twitter_screen_name ? `https://twitter.com/${cg.links.twitter_screen_name}` : undefined;
            const telegram = cg.links?.telegram_channel_identifier ? `https://t.me/${cg.links.telegram_channel_identifier}` : undefined;
            const chain =
                cg.asset_platform_id?.toUpperCase() ??
                (cg.name?.toUpperCase().includes("BITCOIN") ? "BITCOIN" : "NATIVE");
            const type = cg.detail_platforms && Object.keys(cg.detail_platforms).length > 0 ? "TOKEN" : "COIN";
            return {
                name: cg.name ?? BINANCE_SYMBOL.replace("USDT", ""),
                symbol: (cg.symbol ?? BINANCE_SYMBOL.slice(0, -4)).toUpperCase(),
                chainBadge: chain,
                typeBadge: type,
                logoUrl: cg.image?.small ?? `https://cryptoicons.org/api/icon/${BINANCE_SYMBOL.slice(0, -4).toLowerCase()}/64`,
                siteUrl: homepage,
                twitterUrl: twitter,
                telegramUrl: telegram,
            };
        }
        return {
            name: BINANCE_SYMBOL.replace("USDT", ""),
            symbol: BINANCE_SYMBOL.slice(0, -4),
            chainBadge: "NATIVE",
            typeBadge: "COIN",
            logoUrl: `https://cryptoicons.org/api/icon/${BINANCE_SYMBOL.slice(0, -4).toLowerCase()}/64`,
        };
    }, [cg]);

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

    const last = stat ? parseFloat(stat.lastPrice) : (candles.at(-1)?.c ?? 0);
    const first = candles[0]?.c ?? last;
    const diffPct = stat ? parseFloat(stat.priceChangePercent) : ((last - first) / (first || 1)) * 100;

    // 테마별 색상 팔레트
    const pal = useMemo(() => ({
        shell: isDark ? "bg-black text-white" : "bg-white text-gray-900",
        grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        axis: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
        tick: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)",
        line: isDark ? "#ff5b5b" : "#ef4444",
        areaTop: isDark ? "rgba(239,68,68,.22)" : "rgba(239,68,68,.15)",
        areaBottom: isDark ? "rgba(239,68,68,.02)" : "rgba(239,68,68,.01)",
        chartBg: isDark ? "bg-black" : "bg-gray-50",
        border: isDark ? "border-white/10" : "border-gray-200",
    }), [isDark]);

    const tabs = ["차트", "호가", "내 주식", "종목정보", "커뮤니티"];
    const [activeTab, setActiveTab] = useState("차트");

    const buttonClass = isDark
        ? "rounded-md bg-white/5 px-2 py-1 hover:bg-white/10"
        : "rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200";

    return (
        <section className={`rounded-2xl ${pal.shell} p-3 sm:p-4 min-w-0`}>
            <Toolbar meta={meta} range={range} onRange={setRange} isDark={isDark} />

            <div className="mt-3 flex items-center gap-2">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">{nfUSD(last)}</div>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        diffPct >= 0 ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
                    }`}
                >
                    {pctFmt(diffPct)}
                </span>
                <div className="ml-auto flex flex-wrap items-center gap-2 text-xs shrink-0">
                    <button onClick={() => setUseLog((s) => !s)} className={buttonClass} title="축 스케일">
                        {useLog ? "로그" : "선형"}
                    </button>
                    <button onClick={() => setShowVolume((s) => !s)} className={`${buttonClass} flex items-center gap-1`}>
                        <BarChart3 className="h-4 w-4" /> 거래량
                    </button>
                    <button onClick={() => setShowSMA((s) => !s)} className={buttonClass}>
                        SMA 7
                    </button>
                    <button onClick={() => setShowEMA((s) => !s)} className={buttonClass}>
                        EMA 25
                    </button>
                    {isLoading && <span className={isDark ? "text-white/60" : "text-gray-500"}>갱신 중…</span>}
                    {error && <span className="text-rose-400">데이터 오류</span>}
                </div>
            </div>

            <div className={`flex gap-6 px-4 pt-4 border-b ${pal.border}`}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-base font-medium transition-colors relative cursor-pointer ${
                            activeTab === tab
                                ? isDark ? "text-white" : "text-gray-900"
                                : isDark ? "text-white/40 hover:text-white/70" : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t ${
                                isDark ? "bg-white" : "bg-gray-900"
                            }`} />
                        )}
                    </button>
                ))}
            </div>

            {/* 차트 탭 */}
            {activeTab === "차트" && (
                <div className={`mt-2 rounded-xl ${pal.chartBg} p-2 sm:p-3 overflow-hidden min-w-0 animate-fade-in`}>
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
                                    tickFormatter={(n: number) =>
                                        isMobile ? nfUSDCompact(n) : n < 1 ? n.toExponential(2) : `$${n.toLocaleString()}`
                                    }
                                />
                                {showVolume && <YAxis yAxisId="vol" hide domain={[0, "auto"]} />}

                                <Tooltip content={<ChartTooltip isDark={isDark} />} />
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
                                        fill={isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"}
                                        isAnimationActive={false}
                                    />
                                )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                            <div className={isDark ? "text-white/60" : "text-gray-600"}>체인</div>
                            <div className="mt-1 font-semibold">{meta.chainBadge}</div>
                        </div>
                        <div>
                            <div className={isDark ? "text-white/60" : "text-gray-600"}>마지막 가격</div>
                            <div className="mt-1 font-semibold">{nfUSD(last)}</div>
                        </div>
                        <div>
                            <div className={isDark ? "text-white/60" : "text-gray-600"}>24시간 변동</div>
                            <div className={`mt-1 font-semibold ${diffPct >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                {pctFmt(diffPct)}
                            </div>
                        </div>
                        <div>
                            <div className={isDark ? "text-white/60" : "text-gray-600"}>24시간 거래대금(USDT)</div>
                            <div className="mt-1 font-semibold">
                                {stat?.quoteVolume ? nfUSD(parseFloat(stat.quoteVolume)) : "—"}
                            </div>
                        </div>
                    </div>

                    <div className={`mt-4 text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        Source: Binance ({BINANCE_SYMBOL}){isDev ? ` · Meta: CoinGecko (${COINGECKO_ID})` : ""}
                    </div>
                </div>
            )}

            {/* 호가 탭 */}
            {activeTab === "호가" && (
                <div className={`mt-4 rounded-xl ${pal.chartBg} p-6 text-center animate-fade-in`}>
                    <div className={isDark ? "text-white/60" : "text-gray-600"}>
                        호가 정보가 여기에 표시됩니다
                    </div>
                </div>
            )}

            {/* 내 주식 탭 */}
            {activeTab === "내 주식" && (
                <div className={`mt-4 rounded-xl ${pal.chartBg} p-6 text-center animate-fade-in`}>
                    <div className={isDark ? "text-white/60" : "text-gray-600"}>
                        보유 주식 정보가 여기에 표시됩니다
                    </div>
                </div>
            )}

            {/* 종목정보 탭 */}
            {activeTab === "종목정보" && (
                <div className={`mt-4 rounded-xl ${pal.chartBg} p-6 text-center animate-fade-in`}>
                    <div className={isDark ? "text-white/60" : "text-gray-600"}>
                        종목 상세 정보가 여기에 표시됩니다
                    </div>
                </div>
            )}

            {/* 커뮤니티 탭 */}
            {activeTab === "커뮤니티" && (
                <div className={`mt-4 rounded-xl ${pal.chartBg} p-6 text-center animate-fade-in`}>
                    <div className={isDark ? "text-white/60" : "text-gray-600"}>
                        커뮤니티 게시글이 여기에 표시됩니다
                    </div>
                </div>
            )}

            {/* 페이드인 애니메이션 스타일 */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </section>
    );
};