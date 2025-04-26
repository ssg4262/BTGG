import profile from "@/assets/img/profile/profile.png";
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";
import {MoreVerticalOption} from "@/components/ui/MoreVerticalOption.tsx";

export const UserInfo = () => {
    return(
        <>
            <div className="h-[58px] bg-[rgb(20,18,20)] shadow-ml">
                <div className="flex justify-end m-2 mt-4">
                    <MoreVerticalOption/>
                </div>
            </div>
            <div className="relative">
                {/* 프로필 이미지 */}
                <div className="absolute -top-11 left-3">
                    <div className="relative">
                        <img
                            src={profile}
                            alt="프로필 이미지"
                            className="w-17 h-17 rounded-full border-3 border-[rgb(18,18,20)]"
                        />
                        {/* 접속 상태 표시 */}
                        <span className="absolute right-0 bottom-1 w-4 h-4 bg-green-500 border-2 border-[rgb(18,18,20)] rounded-full"></span>
                    </div>
                </div>
            </div>
            {/* 🔹 서버 헤더 */}
            <div className="h-[120px] flex items-center overflow-hidden bg-[rgb(18,18,20)]">
                <div className="px-2 pt-3 text-white rounded-md ml-2 mr-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-bold text-lg leading-none">고승범</span>
                        <span className="text-gray-400 text-sm leading-tight">#223388</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="text-[12px] text-gray-400">goseungbeom5757</p>
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