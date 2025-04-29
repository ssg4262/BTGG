import { UserPlus } from "lucide-react";
import { BlurSearchBar } from "@/components/ui/BlurSearchBar.tsx";

export const ChatFriendsList = () => {
    return (
        <div className="flex justify-center items-center gap-4 pt-4">
            {/* Search Bar */}
            <div className="h-10 w-[420px]">
                <BlurSearchBar />
            </div>

            {/* 친구 추가 버튼 (같은 높이 10) */}
            <button className="h-10 flex items-center gap-2 px-4 rounded-md bg-white/5 backdrop-blur-md text-white font-medium text-sm shadow-inner hover:bg-white/10 transition">
                <UserPlus size={18} />
                <span className="text-sm text-gray-300 ">친구 추가</span>
            </button>
        </div>
    );
};
