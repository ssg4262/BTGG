"use client";

import { useState } from "react";
import { BlurSearchBar } from "@/components/ui/BlurSearchBar";
import { BlurBtn } from "@/components/ui/BlurBtn";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { CollectionList } from "@/components/card/CollectionList";
import { CompassSVG } from "@/assets/svg/ui/CompassSVG";
import { Menu, X } from "lucide-react";

export const MainTopHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-md transition-all duration-300">
            <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* 왼쪽: 로고 + 데스크탑 메뉴 */}
                <div className="flex items-center space-x-5">
                    <div className="flex flex-col text-white font-bold text-[31px] leading-none font-BlackHanSans mt-3 scale-x-[1.3]">
                        <span>META</span>
                        <span>DROP</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6 text-white text-md font-semibold">
                        <a href="#">Drops</a>
                        <a href="#">Stats</a>
                        <a href="#">Create</a>
                    </nav>
                </div>

                {/* 가운데: 검색바 (lg 이상에서만 보임) */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <div className="w-full max-w-md">
                        <BlurSearchBar />
                    </div>
                </div>

                {/* 오른쪽: 버튼 & 햄버거 */}
                <div className="flex items-center space-x-3">
                    {/* 모바일 햄버거 */}
                    <button onClick={toggleMobileMenu} className="md:hidden text-white">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* 데스크탑 버튼 */}
                    <div className="hidden md:flex items-center space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <BlurBtn key={i} component={<CompassSVG />} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 pb-4 pt-2 bg-[#0d0d0d] text-white space-y-2">
                    <a href="#" className="block">Drops</a>
                    <a href="#" className="block">Stats</a>
                    <a href="#" className="block">Create</a>
                </div>
            )}

            {/* 카테고리 & 리스트 */}
            <CategoryTabs />
            <CollectionList />
        </header>
    );
};
