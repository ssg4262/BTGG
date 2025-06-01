"use client";

import { BlurSearchBar } from "@/components/ui/BlurSearchBar";
import { FaCube, FaShoppingCart, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/DarkModeToggle";

export const MainTopHeader = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white text-black dark:bg-black dark:text-white border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            <div className="mx-auto flex items-center justify-between px-6 py-3">

                {/* 좌측 네비게이션 */}
                <div className="flex items-center gap-6 text-sm font-medium flex-shrink-0">
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">NFT</a>
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1">
                        Inscription <ChevronDown className="w-4 h-4" />
                    </a>
                    <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Runes</a>
                    <a href="#" className="font-semibold">Drops</a>
                    <a href="#" className="text-green-500 font-semibold">OXOG House</a>
                </div>

                {/* 우측 아이콘 + 검색창 */}
                <div className="flex items-center gap-5 flex-shrink-0 ml-auto">
                    <BlurSearchBar />
                    <FaCube className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                    <FaShoppingCart className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                    <FaUser className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                    <div className="text-base">
                        <ThemeToggle />
                    </div>
                </div>

            </div>
        </header>
    );
};