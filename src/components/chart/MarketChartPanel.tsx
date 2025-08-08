import { useMemo, useState, useEffect } from "react";
import { LineChart } from "lucide-react";

type RangeKey = "24h" | "7d" | "1m" | "3m" | "6m" | "1y" | "all";
type TabKey = "chart" | "market" | "info";
type SubTabKey = "price" | "cap" | "volume";

const tfLabels: Record<RangeKey, string> = {
    "24h": "24시간",
    "7d": "7일",
    "1m": "1개월",
    "3m": "90일",
    "6m": "180일",
    "1y": "1년",
    "all": "전체",
};

const topTabs: { key: TabKey; label: string }[] = [
    { key: "chart", label: "차트" },
    { key: "market", label: "시장" },
    { key: "info", label: "정보" },
];

const subTabs: { key: SubTabKey; label: string }[] = [
    { key: "price", label: "가격검색" },
    { key: "cap", label: "시가총액" },
    { key: "volume", label: "총량" },
];

const defaultSeries = [
    52, 160, 198, 240, 215, 260, 310, 270, 285, 265, 258, 300, 250, 255, 265,
    295, 270, 262, 275, 320, 290, 282, 288, 295, 260, 170, 150, 180, 190, 230, 220,
];

const formatKRW = (n: number) => `₩${(n / 100).toFixed(2)}억`;

export const MarketChartPanel = ({
                                     series = defaultSeries,
                                     range: initialRange = "1m",
                                 }: {
    series?: number[];
    range?: RangeKey;
}) => {
    const [tab, setTab] = useState<TabKey>("chart");
    const [sub, setSub] = useState<SubTabKey>("price");
    const [range, setRange] = useState<RangeKey>(initialRange);
    const [isDark, setIsDark] = useState(true);

    // 다크모드 감지
    useEffect(() => {
        const root = document.documentElement;
        const updateTheme = () => setIsDark(root.classList.contains("dark"));
        updateTheme();
        const obs = new MutationObserver(updateTheme);
        obs.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => obs.disconnect();
    }, []);

    // 색상 모드별 팔레트
    const colors = {
        bg: isDark ? "#0d0f0e" : "#ffffff",
        gridStrong: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        gridWeak: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        yLabel: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)",
        xLabel: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
        tabInactive: isDark ? "text-white/70" : "text-black/70",
        subInactive: isDark
            ? "border-white/10 text-white bg-transparent hover:bg-white/5"
            : "border-black/10 text-black bg-transparent hover:bg-black/5",
    };

    // SVG ViewBox
    const W = 1200;
    const H = 420;
    const PAD_L = 66;
    const PAD_R = 24;
    const PAD_T = 20;
    const PAD_B = 44;

    const plot = useMemo(() => {
        const data = series;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const innerW = W - PAD_L - PAD_R;
        const innerH = H - PAD_T - PAD_B;
        const stepX = innerW / (data.length - 1 || 1);
        const scaleY = (v: number) =>
            max === min
                ? PAD_T + innerH
                : PAD_T + innerH - ((v - min) / (max - min)) * innerH;

        const points = data.map((v, i) => [PAD_L + i * stepX, scaleY(v)] as const);
        const d = points
            .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
            .join(" ");
        const dArea = `${d} L ${PAD_L + (data.length - 1) * stepX},${H - PAD_B} L ${PAD_L},${H - PAD_B} Z`;

        const ticks = Array.from({ length: 6 }, (_, i) => {
            const t = i / 5;
            const y = PAD_T + (1 - t) * innerH;
            const value = min + t * (max - min);
            return { y, label: formatKRW(value) };
        });

        const showEvery = Math.ceil(data.length / 8);
        const xTicks = Array.from({ length: data.length }, (_, i) => ({
            x: PAD_L + i * stepX,
            label: i % showEvery === 0 ? pseudoDate(i) : "",
        }));

        const midValue = data[data.length - 2] ?? data[data.length - 1];
        const guideY = scaleY(midValue);

        return { d, dArea, ticks, xTicks, guideY };
    }, [series]);

    return (
        <section
            className={`rounded-xl border overflow-hidden ${
                isDark
                    ? "border-white/10 text-white"
                    : "border-black/10 text-black"
            }`}
            style={{ backgroundColor: colors.bg }}
        >
            {/* 상단 탭 */}
            <div className="px-4 pt-3">
                <div className="flex items-center gap-5 text-sm">
                    {topTabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`pb-2 border-b-2 -mb-px ${
                                tab === t.key
                                    ? "text-[#C7FF4A] border-[#C7FF4A]"
                                    : `${colors.tabInactive} border-transparent`
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                    <div className="ml-auto inline-flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-md border border-[#C7FF4A]/30 px-2 py-0.5">
              <LineChart className="size-4 text-[#C7FF4A]" />
              00
            </span>
                    </div>
                </div>

                {/* 서브탭 */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                    {subTabs.map((s) => (
                        <button
                            key={s.key}
                            onClick={() => setSub(s.key)}
                            className={`rounded-md px-2.5 py-1 border ${
                                sub === s.key
                                    ? "border-[#C7FF4A] text-black bg-[#C7FF4A]"
                                    : colors.subInactive
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                    <div className="ml-auto hidden md:flex items-center gap-1">
                        {(["24h", "7d", "1m", "3m", "6m", "1y", "all"] as RangeKey[]).map(
                            (rk) => (
                                <button
                                    key={rk}
                                    onClick={() => setRange(rk)}
                                    className={`rounded-sm px-2 py-1 text-xs border ${
                                        range === rk
                                            ? "border-[#C7FF4A] bg-[#C7FF4A]/10 text-[#C7FF4A]"
                                            : colors.subInactive
                                    }`}
                                >
                                    {tfLabels[rk]}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* 차트 */}
            <div className="px-2 pb-2">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[420px] block">
                    {/* 배경 */}
                    <rect x="0" y="0" width={W} height={H} fill={colors.bg} />

                    {/* y-grid */}
                    {plot.ticks.map((t, i) => (
                        <g key={i}>
                            <line
                                x1={PAD_L}
                                x2={W - PAD_R}
                                y1={t.y}
                                y2={t.y}
                                stroke={colors.gridStrong}
                            />
                            <text x={W - PAD_R + 6} y={t.y + 4} fontSize="12" fill={colors.yLabel}>
                                {t.label}
                            </text>
                        </g>
                    ))}

                    {/* x-grid */}
                    {plot.xTicks.map(
                        (t, i) =>
                            t.label && (
                                <g key={i}>
                                    <line
                                        x1={t.x}
                                        x2={t.x}
                                        y1={PAD_T}
                                        y2={H - PAD_B}
                                        stroke={colors.gridWeak}
                                    />
                                    <text
                                        x={t.x}
                                        y={H - PAD_B + 18}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill={colors.xLabel}
                                    >
                                        {t.label}
                                    </text>
                                </g>
                            )
                    )}

                    {/* 가이드라인 */}
                    <line
                        x1={PAD_L}
                        x2={W - PAD_R}
                        y1={plot.guideY}
                        y2={plot.guideY}
                        stroke="#B6FF34"
                        strokeDasharray="4 4"
                        opacity={0.7}
                    />

                    {/* 가격 라벨 */}
                    <g transform={`translate(${W - PAD_R - 64},${plot.guideY - 10})`}>
                        <rect width="64" height="20" rx="4" fill="#B6FF34" opacity="0.9" />
                        <text x="32" y="14" textAnchor="middle" fontSize="12" fill="#0c0f0d">
                            {formatKRW(series.at(-1) || 0)}
                        </text>
                    </g>

                    {/* gradient + glow */}
                    <defs>
                        <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#B6FF34" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#B6FF34" stopOpacity="0.0" />
                        </linearGradient>
                        <filter id="glow">
                            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#B6FF34" floodOpacity="0.6" />
                        </filter>
                    </defs>

                    {/* area */}
                    <path d={plot.dArea} fill="url(#areaGrad)" opacity={0.9} />

                    {/* line */}
                    <path d={plot.d} fill="none" stroke="#7EFF2E" strokeWidth={3} filter="url(#glow)" />
                </svg>
            </div>
        </section>
    );
};

const pseudoDate = (i: number) => {
    const base = new Date();
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() - (defaultSeries.length - 1 - i));
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};
