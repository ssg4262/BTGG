// src/components/banners/PricePredictionBanner.tsx
import { ArrowUpRight } from "lucide-react";
import React from "react";

type Props = {
    title?: string;
    description?: string;
    ctaLabel?: string;
    href?: string;                 // 있으면 <a>, 없으면 <button>
    onClick?: () => void;
    className?: string;
};

export const PricePredictionBanner: React.FC<Props> = ({
                                                           title = "비트코인의 가격 예측은?",
                                                           description = "미래에 비트코인의 가치가 얼마나 될지 알아보고 투자 결정을 내리세요",
                                                           ctaLabel = "비트코인 가격 예측 보기",
                                                           href,
                                                           onClick,
                                                           className = "",
                                                       }) => {
    // 버튼 렌더러(모바일=가득, sm 이상=고정폭 300)
    const Button: React.FC<React.PropsWithChildren> = ({ children }) =>
        href ? (
            <a
                href={href}
                className="inline-flex h-[40px] w-full sm:w-[300px] items-center justify-center gap-[10px]
                   rounded-[8px] font-semibold tracking-[-0.2px]
                   bg-[#C7FF4A] text-[#0B0D0C] hover:brightness-95 transition-[filter]
                   focus:outline-none focus:ring-2 focus:ring-white/20"
            >
                {children}
                <ArrowUpRight className="size-[16px]" />
            </a>
        ) : (
            <button
                type="button"
                onClick={onClick}
                className="inline-flex h-[40px] w-full sm:w-[300px] items-center justify-center gap-[10px]
                   rounded-[8px] font-semibold tracking-[-0.2px]
                   bg-[#C7FF4A] text-[#0B0D0C] hover:brightness-95 transition-[filter]
                   focus:outline-none focus:ring-2 focus:ring-white/20"
            >
                {children}
                <ArrowUpRight className="size-[16px]" />
            </button>
        );

    return (
        <section
            role="region"
            aria-label="가격 예측 배너"
            className={[
                // 카드 캔버스 (이미지 비율에 맞춘 라운드/배경/보더/패딩)
                "w-full rounded-[10px] bg-[#1E1E1E] border border-white/8 text-white",
                "px-[18px] py-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                // 다크모드 동일 톤 유지
                "dark:bg-[#1E1E1E] dark:border-white/10",
                className,
            ].join(" ")}
        >
            {/* 행 높이 고정: 원본처럼 슬림(모바일에선 자동 높이) */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center">
                {/* 좌측 텍스트 */}
                <div className="min-w-0">
                    <h3 className="text-[14px] leading-[18px] font-semibold text-white">
                        {title}
                    </h3>
                    <p className="mt-[6px] text-[13px] leading-[16px] text-white/70 truncate">
                        {description}
                    </p>
                </div>

                {/* 우측 버튼: 모바일 full, 데스크탑 고정폭 */}
                <div className="sm:pl-3">
                    <Button>{ctaLabel}</Button>
                </div>
            </div>
        </section>
    );
};

export default PricePredictionBanner;
