import profileImg from "@/assets/img/profile/profile.png";

export const UserStatusBar = () => {
    return (
        <div className="bg-[rgb(32,32,36)] p-2 w-[333px] h-[73px] flex items-center justify-between rounded-md">
            {/* 프로필 + 유저 정보 */}
            <div className="flex items-center gap-2">
                <div className="relative ml-2">
                    <img
                        src={profileImg}
                        alt="profile"
                        className="w-11 h-11 rounded-full"
                    />
                    {/* 상태 표시 원 */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e1f22]" />
                </div>
                <div className="flex flex-col leading-tight ml-2">
                    <div className="flex items-baseline">
                        <span className="text-lg font-medium text-white">gsb</span>
                        <span className="text-xs text-zinc-400 ml-1">#0000</span>
                    </div>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                        친구 5명 <span className="text-[5px] leading-none relative top-[-1.5px]">●</span> 서버 2개
                    </p>
                </div>
            </div>

            {/* 버튼들 */}
            {/*<div className="flex items-center gap-2">*/}
            {/*    <button className="p-1 rounded hover:bg-red-500/20">*/}
            {/*        <Mic className="w-4 h-4 text-red-500" />*/}
            {/*    </button>*/}
            {/*    <button className="p-1 rounded hover:bg-zinc-700">*/}
            {/*        <Headphones className="w-4 h-4 text-white" />*/}
            {/*    </button>*/}
            {/*    <button className="p-1 rounded hover:bg-zinc-700">*/}
            {/*        <Settings className="w-4 h-4 text-white" />*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};