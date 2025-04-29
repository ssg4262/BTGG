import { useState, useEffect } from "react";
import clsx from "clsx";
import { BlurSearchBar } from "@/components/ui/BlurSearchBar.tsx";
import { BlurBtn } from "@/components/ui/BlurBtn.tsx";
import { CategoryTabs } from "@/components/ui/CategoryTabs.tsx";
import { CollectionList } from "@/components/card/CollectionList.tsx";
import {darkenColor} from "@/utils/DarkenColor.ts";

export const MainTopHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [bgColor, setBgColor] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={clsx("fixed top-0 w-full z-50 transition-all duration-300")}
            style={{
                background: bgColor
                    ? `linear-gradient(to bottom, ${darkenColor(bgColor, 0.4)}, ${bgColor})`
                    : isScrolled
                        ? "#0d0d0d"
                        : "transparent",
                backdropFilter: "blur(12px)",
            }}
        >
            <div className="max-w-screen-2xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
                {/* Logo & Nav */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 border-r border-white/20 pr-6 ml-2">
                        <span className="text-white font-bold text-[21px]">OpenNFT</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6 text-white text-md font-semibold">
                        <a href="#">Drops</a>
                        <a href="#">Stats</a>
                        <a href="#">Create</a>
                    </nav>
                </div>

                {/* Search */}
                <div className="hidden lg:flex justify-center">
                    <div className="w-full max-w-md">
                        <BlurSearchBar />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-3 mr-2">
                    <BlurBtn text="LOGIN" />
                    <BlurBtn text="👤" />
                    <BlurBtn text="🛒" />
                </div>
            </div>

            <CategoryTabs />

            {/* 전달할 콜백으로 첫 이미지 색 받아오기 */}
            <CollectionList onFirstImageColorExtract={setBgColor} />
        </header>
    );
};
