import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";

export const SearchBar = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="flex items-center space-x-2">
            {/* 검색바 */}
            <div className="flex items-center bg-[rgb(20,20,24)] text-white rounded-full px-4 py-2 min-w-[210px] max-w-[210px]">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent flex-1 min-w-1 text-sm outline-none placeholder-zinc-500"
                    placeholder="검색하기"
                />

                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="w-5 h-5 flex items-center justify-center bg-zinc-700 rounded-full text-zinc-300 hover:bg-zinc-600 ml-2 shrink-0"
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* 필터 버튼 */}
            <ActionTooltip side="top" align="center" label="필터 조건 검색">
                <button className="w-8 h-8 flex items-center justify-center bg-[rgb(20,20,24)] rounded-full text-zinc-400 hover:bg-zinc-700">
                    <SlidersHorizontal className="w-4 h-4" />
                </button>
            </ActionTooltip>
        </div>
    );
};
