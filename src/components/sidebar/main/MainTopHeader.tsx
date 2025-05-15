"use client";

import { BlurSearchBar } from "@/components/ui/BlurSearchBar";
import {ThemeToggle} from "@/components/ui/DarkModeToggle.tsx";

export const MainTopHeader = () => {
    return (
        <header className="fixed top-0 w-full z-50
            bg-white/80 dark:bg-[#0d0d0d]/80
            backdrop-blur-md transition-all duration-300
            border-b border-black/10 dark:border-white/10">

            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* 로고 / 브랜드명 */}
                <div className="text-black dark:text-white font-semibold text-xl tracking-wide font-BlackHanSans">
                    MetaFlux
                </div>

                {/* 블러 서치바 */}
                <div className="w-full max-w-md">
                    <BlurSearchBar />
                </div>

                {/* 우측 아이콘 영역 */}
                <div className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    );
};
