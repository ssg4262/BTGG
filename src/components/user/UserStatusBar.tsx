import { Mic, Headphones, Settings } from "lucide-react"; // 아이콘 라이브러리
import profileImg from "@/assets/img/profile/profile.png"; // 예시 프로필 이미지

export const UserStatusBar = () => {
    return (
        <div className="bg-[#1e1f22] p-2 flex items-center justify-between rounded-md">
            {/* 프로필 + 유저 정보 */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img
                        src={profileImg}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                    />
                    {/* 상태 표시 원 */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e1f22]" />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-white">gsb</span>
                    <span className="text-xs text-zinc-400">sad</span>
                </div>
            </div>

            {/* 버튼들 */}
            <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-red-500/20">
                    <Mic className="w-4 h-4 text-red-500" />
                </button>
                <button className="p-1 rounded hover:bg-zinc-700">
                    <Headphones className="w-4 h-4 text-white" />
                </button>
                <button className="p-1 rounded hover:bg-zinc-700">
                    <Settings className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
};