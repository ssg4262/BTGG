import { ArrowUpRight, Star, Repeat } from "lucide-react";

type Props = {
    /** 'sidebar' = 데스크탑 좌고정, 'main' = 모바일 메인 상단 카드 */
    context?: "sidebar" | "main";
    headerHeightPx?: number;

    name?: string; symbol?: string; rank?: number;
    price?: string; changePct?: string; provider?: string;
    low?: string; high?: string; athDate?: string; athPrice?: string;
    marketRank?: string; dailyChangePct?: string; marketCap?: string; fullyDiluted?: string;
    volumeTotal?: string; circulatingSupply?: string; totalSupply?: string; maxSupply?: string;
};

export const MainSubSideBar = ({
                                   context = "sidebar",
                                   headerHeightPx = 56,

                                   name = "Bitcoin", symbol = "BTC", rank = 1,
                                   price = "₩161,109,161.00", changePct = "1.11%", provider = "coingecko",
                                   low = "₩75,594.00", high = "₩169,555,885.00",
                                   athDate = "월, 2025년 7월 14일", athPrice = "₩169,555,885.00",
                                   marketRank = "#1", dailyChangePct = "1.37%",
                                   marketCap = "₩3,215,593,310,748,222.00", fullyDiluted = "₩3,215,593,310,748,222.00",
                                   volumeTotal = "₩47,472,368,666,833.00",
                                   circulatingSupply = "19,903,628.00", totalSupply = "19,903,628.00", maxSupply = "21,000,000.00",
                               }: Props) => {
    const isSidebar = context === "sidebar";
    const calcH = `calc(100vh - ${headerHeightPx}px)`;

    return (
        <aside
            className={[
                // 라이트/다크 공통 카드 스타일
                "text-sm bg-white border border-zinc-200 text-zinc-900",
                "dark:bg-black dark:border-white/10 dark:text-white",
                // 사이드바 모드: 좌고정용 레이아웃
                isSidebar ? "flex flex-col" : "rounded-xl" // 모바일 메인 카드이면 라운드
            ].join(" ")}
            style={isSidebar ? { height: calcH } : undefined}
        >
            {/* ── 헤더(요청 소스 그대로) ── */}
            <div className={isSidebar ? "flex-none" : ""}>
                <div className="px-5 pt-4 pb-3 text-zinc-500 dark:text-white/50">
                    가격 / <span className="text-zinc-900 dark:text-white">{name}</span>
                </div>

                <div className="px-5 pb-4 border-b border-zinc-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-[#F7931A] grid place-items-center text-black font-bold">₿</div>
                        <div className="text-lg font-semibold">
                            {name} <span className="text-zinc-500 dark:text-white/50 font-normal">{symbol}</span>
                        </div>
                        <span className="ml-2 text-xs bg-zinc-200 dark:bg-white/10 px-2 py-0.5 rounded">#{rank}</span>
                        <button className="ml-auto text-zinc-600 hover:text-zinc-800 dark:text-white/70 dark:hover:text-white">
                            <Star className="size-5" />
                        </button>
                    </div>

                    <div className="mt-3 text-3xl font-extrabold tracking-tight">
                        {price}{" "}
                        <span className="text-emerald-600 dark:text-[#7CFF5D] align-middle text-base">
              {changePct} ▲
            </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <div className="size-6 rounded-full bg-zinc-200 dark:bg-white/10 grid place-items-center text-[10px]">🦎</div>
                        <span className="text-xs text-zinc-500 dark:text-white/70">{provider} 제공 가격 데이터</span>
                    </div>

                    <button className="mt-3 w-full h-10 rounded-md bg-black text-white dark:bg-[#A7FF4B] dark:text-black font-semibold inline-flex items-center justify-center gap-2">
                        구입하다 <ArrowUpRight className="size-4" />
                    </button>
                </div>
            </div>

            {/* ── 본문: 사이드바 모드=내부 스크롤, 메인 모드=페이지 스크롤 ── */}
            <div
                className={[
                    isSidebar
                        ? "flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        : "" // 메인 모드: 내부 오버플로우 제거 (페이지가 스크롤)
                ].join(" ")}
            >
                <Section title="가격 성과">
                    <Row label="최저" value={low} />
                    <Row label="최고" value={high} />
                    <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-white/60">역대 최고가</span>
                        <div className="text-right">
                            <div className="text-zinc-900 dark:text-white/90">{athDate}</div>
                            <div className="text-emerald-600 dark:text-[#7CFF5D]">{athPrice}</div>
                        </div>
                    </div>
                </Section>

                <Section title="시가총액">
                    <Row label="종합 순위" value={marketRank} />
                    <Row label="일일 변동 %" value={<span className="text-emerald-600 dark:text-[#7CFF5D]">{dailyChangePct} ▲</span>} />
                    <Row label="시가 총액 ($)" value={marketCap} />
                    <Row label="완전 희석 시가 총액" value={fullyDiluted} />
                </Section>

                <Section title="거래량">
                    <Row label="총량" value={volumeTotal} />
                </Section>

                <Section title="발행량">
                    <Row label="발행량 중 유통량" value={circulatingSupply} />
                    <Row label="총 발행량" value={totalSupply} />
                    <Row label="최대 발행량" value={maxSupply} />
                </Section>

                {/* 환산(메인/사이드 동일 UI) */}
                <section className="px-5 py-4 border-t border-zinc-200 dark:border-white/10">
                    <div className="text-zinc-900 dark:text-white/80 mb-3 font-medium">암호화폐-법정화폐 환산</div>

                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="number"
                            defaultValue={1}
                            className="w-1/2 h-10 rounded-md bg-white border border-zinc-200 px-2 text-zinc-900
                         dark:bg-black/20 dark:border-white/10 dark:text-white"
                        />
                        <div className="relative w-1/2">
                            <select className="w-full h-10 appearance-none rounded-md bg-white border border-zinc-200 px-2 pr-8 text-zinc-900
                                  dark:bg-black/20 dark:border-white/10 dark:text-white">
                                <option>{symbol}</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-white/60">▼</span>
                        </div>
                    </div>

                    <div className="flex justify-center mb-3">
                        <Repeat className="size-4 text-zinc-500 dark:text-white/50" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="number"
                            defaultValue={116548}
                            className="w-1/2 h-10 rounded-md bg-white border border-zinc-200 px-2 text-zinc-900
                         dark:bg-black/20 dark:border-white/10 dark:text-white"
                        />
                        <div className="relative w-1/2">
                            <select className="w-full h-10 appearance-none rounded-md bg-white border border-zinc-200 px-2 pr-8 text-zinc-900
                                  dark:bg-black/20 dark:border-white/10 dark:text-white">
                                <option>USD</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-white/60">▼</span>
                        </div>
                    </div>

                    <button className="w-full h-10 rounded-md bg-black text-white dark:bg-[#A7FF4B] dark:text-black font-semibold mb-3">
                        암호화폐-법정화폐 환산
                    </button>

                    <a href="#" className="block text-center text-sm text-zinc-600 hover:text-zinc-800 dark:text-white/70 dark:hover:text-white">
                        Bybit에서 전환 <ArrowUpRight className="inline size-4" />
                    </a>
                </section>
            </div>
        </aside>
    );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="px-5 py-4 border-b border-zinc-200 dark:border-white/10 last:border-b-0">
        <div className="text-zinc-900 dark:text-white/80 mb-3 font-medium">{title}</div>
        <div className="space-y-2">{children}</div>
    </section>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between">
        <span className="text-zinc-600 dark:text-white/60">{label}</span>
        <span className="text-zinc-900 dark:text-white/90">{value}</span>
    </div>
);
