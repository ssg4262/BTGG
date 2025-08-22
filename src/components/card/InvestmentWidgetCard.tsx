// src/components/cards/InvestmentWidgetCard.tsx
import { RefreshCw } from "lucide-react";

type MiniIcon = {
    key: string;
    label?: string;           // "2x" 같은 텍스트
    emoji?: string;           // "🍎" 같은 이모지(또는 SVG 넣어도 됨)
    bg?: string;              // tailwind bg 클래스 (예: "bg-zinc-800")
    fg?: string;              // 텍스트 색 (예: "text-white")
    ring?: string;            // 외곽선 (예: "ring-white/10")
};

type Props = {
    title?: string;           // "내 투자"
    amount?: number;          // 3080678
    change?: number;          // -84455 (원)
    changePct?: number;       // -2.6 (%)
    asOf?: string;            // "오전 12:08 기준"
    icons?: MiniIcon[];       // 상단 떠있는 작은 아이콘들
    className?: string;
};

const fmtKRW = (v: number) =>
    new Intl.NumberFormat("ko-KR").format(Math.floor(v)) + "원";

export const InvestmentWidgetCard: React.FC<Props> = ({
                                                          title = "내 투자",
                                                          amount = 3_080_678,
                                                          change = -84_455,
                                                          changePct = -2.6,
                                                          asOf = "오전 12:08 기준",
                                                          icons = [
                                                              { key: "aapl", emoji: "", bg: "bg-zinc-800", fg: "text-white", ring: "ring-white/10" },
                                                              { key: "signal", emoji: "⟲", bg: "bg-red-500", fg: "text-white", ring: "ring-white/10" },
                                                              { key: "x2", label: "2x", bg: "bg-indigo-700", fg: "text-white", ring: "ring-white/10" },
                                                              { key: "more", label: "+2", bg: "bg-zinc-200/40 dark:bg-white/10", fg: "text-zinc-600 dark:text-white/80", ring: "ring-transparent" },
                                                          ],
                                                          className = "",
                                                      }) => {
    const negative = change < 0 || changePct < 0;
    const changeColor = negative ? "text-[#3B82F6]" : "text-emerald-500"; // 파랑/초록
    const sign = negative ? "" : "+"; // 한국 증권앱처럼 +만 표시

    return (
        <div
            className={[
                "relative w-full rounded-[28px] p-5",
                "bg-white/95 dark:bg-zinc-900/95",
                "shadow-[0_6px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_26px_rgba(0,0,0,0.45)]",
                "border border-zinc-100/70 dark:border-white/10",
                "backdrop-blur supports-[backdrop-filter]:backdrop-blur",
                className,
            ].join(" ")}
        >
            {/* 떠있는 아이콘 스택 */}
            <div className="absolute -top-4 left-4 flex gap-2">
                {icons.slice(0, 4).map((ic, i) => (
                    <div
                        key={ic.key}
                        className={[
                            "h-9 min-w-9 px-2 rounded-2xl grid place-items-center",
                            "text-sm font-semibold tracking-tight",
                            "shadow-md ring-1",
                            ic.bg ?? "bg-zinc-800",
                            ic.fg ?? "text-white",
                            ic.ring ?? "ring-black/10",
                            i === 3 ? "opacity-90" : "",
                        ].join(" ")}
                        style={{ transform: `translateY(${i % 2 === 0 ? 0 : 2}px)` }}
                    >
                        {ic.label ? ic.label : ic.emoji ?? "•"}
                    </div>
                ))}
            </div>

            {/* 본문 */}
            <div className="mt-3">
                <div className="text-[18px] font-semibold text-zinc-700 dark:text-zinc-300">
                    {title}
                </div>

                <div className="mt-2 text-4xl sm:text-[44px] font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {fmtKRW(amount)}
                </div>

                <div className={"mt-2 text-[18px] font-semibold " + changeColor}>
                    {sign}
                    {fmtKRW(Math.abs(change))} ({changePct < 0 ? "" : "+"}
                    {Math.abs(changePct).toFixed(1)}%)
                </div>
            </div>

            {/* 하단 정보/리프레시 */}
            <div className="mt-6 pt-3 flex items-center justify-between text-[15px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/70 dark:border-white/10">
                <span>{asOf}</span>
                <span className="inline-flex h-8 w-8 rounded-full items-center justify-center bg-zinc-200/60 dark:bg-white/5 text-zinc-500 dark:text-zinc-300">
          <RefreshCw className="size-4" />
        </span>
            </div>
        </div>
    );
};
