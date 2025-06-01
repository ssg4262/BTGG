import { Search } from "lucide-react";
import { useState } from "react";

interface BlurSearchBarProps {
    height?: number; // height in pixels
    placeholder?: string;
}

export const BlurSearchBar = ({ height = 40, placeholder = "Search" }: BlurSearchBarProps) => {
    const [query, setQuery] = useState("");

    return (
        <div className="w-full max-w-sm px-4">
            <div
                className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-[rgb(242,242,242)] dark:bg-white/10 backdrop-blur-lg transition-colors duration-300"
                style={{ height }}
            >
                <div className="flex items-center gap-2 text-gray-800 dark:text-white/80 flex-1">
                    <Search size={16} />
                    <input
                        type="text"
                        className="bg-transparent outline-none text-md w-full placeholder-gray-500 dark:placeholder-white/50"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <kbd className="text-xs text-gray-600 dark:text-white/60 bg-gray-200 dark:bg-white/10 px-2 py-1 rounded-md">
                    /
                </kbd>
            </div>
        </div>
    );
};
