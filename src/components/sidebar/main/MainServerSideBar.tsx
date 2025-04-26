"use client";
import { SearchBar } from "@/components/ui/SearchBar.tsx";
import { Tabs } from "@/components/ui/Tabs.tsx";

const tabItems = [
    { id: 1, label: "친구" },
    { id: 2, label: "즐겨찾기" },
];

const handleTabChange = (val: number) => {
    console.log(val);
};

export const MainServerSideBar = () => {
    return (
        <div className="w-[280px] border-t- border-l-1 border-[rgb(50,50,50)] h-screen rounded-tl-2xl bg-[rgb(18,18,20)] text-white flex flex-col">
            <div className="p-3 border-b-1 border-[rgb(50,50,50)]">
                <button className="cursor-pointer w-full h-7 flex items-center justify-center bg-[#2F3136] hover:bg-[#393C43] text-sm font-medium text-white rounded-lg transition-colors duration-200 focus:outline-none">
                    대화 찾기 또는 시작하기
                </button>
            </div>
            <div className="px-2 mt-1 mb-1">
                <SearchBar />
            </div>
            <Tabs tabs={tabItems} onTabChange={handleTabChange} />
        </div>
    );
};
