import profile from "@/assets/img/profile/profile.png";
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";

export const UserInfo = () => {
    return(
        <>
            <div className="h-[70px] bg-[rgb(99,99,99)] shadow-ml">
                <div className="flex justify-end m-2">
                </div>
            </div>
            <div className="relative">
                {/* 프로필 이미지 */}
                <div className="absolute -top-10 left-4">
                    <div className="relative">
                        <img
                            src={profile}
                            alt="프로필 이미지"
                            className="w-16 h-16 rounded-full border-3 border-[rgb(10,10,10)]"
                        />
                        {/* 접속 상태 표시 */}
                        <span className="absolute right-0 bottom-1 w-5 h-5 bg-green-500 border-2 border-[rgb(10,10,10)] rounded-full"></span>
                    </div>
                </div>
            </div>
            {/* 🔹 서버 헤더 */}
            <div className="h-[105px] flex items-center overflow-hidden  bg-[rgb(10,10,10)] ">
                <div className="px-2 pt-3 text-white rounded-md ml-2 mr-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-bold text-lg leading-none">고승범</span>
                        <span className="text-gray-400 text-sm leading-tight">#223388</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="text-[12px] text-white">goseungbeom5757</p>
                        <ActionTooltip side="top" align="center" label="goseungbeom5757 + #223388">
                            <div className="w-6 h-6 flex items-center justify-center rounded-md bg-[#313338]">
                                <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-[#1ABC9C] text-black font-bold text-[12px]">
                                    #
                                </div>
                            </div>
                        </ActionTooltip>
                    </div>
                    <p className="text-[11px] mt-1 text-gray-400 flex items-center gap-1">
                        친구 5명 <span className="text-[5px] leading-none relative top-[-1.5px]">●</span> 서버 2개
                    </p>
                </div>
            </div>
        </>
    )
}