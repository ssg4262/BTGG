"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";

export const MainTopHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 bg-white text-black dark:bg-black dark:text-white border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            {/* ✅ 중앙 정렬 컨테이너 */}
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">

                {/* 좌측: 로고 (약간 우측으로 띄움) */}
                <div className="flex items-center text-[13px] tracking-normal space-x-0.5 font-BlackHanSans">
                    <span className="hover:text-gray-300">BT</span>
                    <span className="text-lime-400">{'</>'}</span>
                    <span className="hover:text-gray-300">GG</span>
                </div>

                {/* 중앙: 데스크톱 네비게이션 */}
                <nav className="hidden md:flex items-center gap-5 font-normal text-[13px]">
                    <a href="#" className="hover:text-gray-300">뉴스</a>
                    <a href="#" className="hover:text-gray-300">투자가이드</a>
                    <a href="#" className="hover:text-gray-300">브랜드드콘텐츠</a>
                    <a href="#" className="text-lime-400 font-semibold">마켓</a>
                    <a href="#" className="hover:text-gray-300">컨설팅·광고 문의</a>
                    <a href="#" className="flex items-center gap-1 hover:text-gray-300">
                        뉴스레터 <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                </nav>

                {/* 우측: 드롭다운 영역 (약간 좌측으로 당김) */}
                <div className="flex items-center gap-2 md:gap-3">
                    <button className="flex items-center gap-1 bg-neutral-900 px-2.5 py-1 rounded text-xs">
                        <span className="text-sm">🇰🇷</span>
                        <span>KRW</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* 햄버거 (모바일 전용) */}
                    <button
                        className="md:hidden ml-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            <div
                className={clsx(
                    "md:hidden overflow-hidden transition-all duration-300",
                    menuOpen ? "max-h-[500px]" : "max-h-0"
                )}
            >
                <div className="px-4 pt-4 pb-6 space-y-4 bg-white dark:bg-black text-sm border-t border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Welcome, Guest!</span>
                    </div>
                    <div className="block sm:hidden">
                    </div>
                    <nav className="flex flex-col gap-2 text-base font-medium">
                        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">뉴스</a>
                        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">투자가이드</a>
                        <a href="#" className="font-semibold">Drops</a>
                        <a href="#" className="text-green-500 font-semibold">BT.GG House</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};
