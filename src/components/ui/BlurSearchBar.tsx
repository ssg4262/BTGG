import { Search } from "lucide-react";

export const BlurSearchBar = () => {
    return (
        <div className="w-full max-w-md px-4">
            <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg h-12 shadow-inner">
                <div className="flex items-center gap-2 text-white/80">
                    <Search size={16} />
                    <span className="text-md">Search</span>
                </div>
                <kbd className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-md">
                    /
                </kbd>
            </div>
        </div>
    );
};
