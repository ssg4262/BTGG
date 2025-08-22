// src/components/logo/BTGGSquareLogo.tsx
import React from "react";

type Props = {
    className?: string;            // ex) "h-6 w-6"
    radius?: number;               // 둥근 모서리 (기본 18)
    title?: string;                // 접근성 레이블
};

export const BTGGWordmark: React.FC<Props> = ({
                                                    className = "h-8 w-8",
                                                    radius = 18,
                                                    title = "BT.GG",
                                                }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={title}
            className={className}
        >
            <title>{title}</title>

            {/* 라이트 모드: 흰 배경 + 검정 글자 */}
            <g className="dark:hidden">
                <rect x="0" y="0" width="100" height="100" rx={radius} fill="#ffffff" />
                <text
                    x="50%"
                    y="38%"                                  // 위 줄
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, SF Pro Display, Arial Black, Arial, Helvetica, sans-serif"
                    fontSize="32"
                    fontWeight={900}
                    letterSpacing="1"
                    fill="#111111"
                >
                    BT.
                </text>
                <text
                    x="50%"
                    y="70%"                                  // 아래 줄
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, SF Pro Display, Arial Black, Arial, Helvetica, sans-serif"
                    fontSize="32"
                    fontWeight={900}
                    letterSpacing="1"
                    fill="#111111"
                >
                    GG
                </text>
            </g>

            {/* 다크 모드: 검정 배경 + 흰 글자 */}
            <g className="hidden dark:block">
                <rect x="0" y="0" width="100" height="100" rx={radius} fill="#111111" />
                <text
                    x="50%"
                    y="38%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, SF Pro Display, Arial Black, Arial, Helvetica, sans-serif"
                    fontSize="32"
                    fontWeight={900}
                    letterSpacing="1"
                    fill="#ffffff"
                >
                    BT.
                </text>
                <text
                    x="50%"
                    y="70%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, SF Pro Display, Arial Black, Arial, Helvetica, sans-serif"
                    fontSize="32"
                    fontWeight={900}
                    letterSpacing="1"
                    fill="#ffffff"
                >
                    GG
                </text>
            </g>
        </svg>
    );
};
