import React from 'react';
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";

interface UserCardProps {
    avatarUrl: string;
    username: string;
    tag: string;
    isOnline: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
                                               avatarUrl,
                                               username,
                                               tag,
                                               isOnline,
                                           }) => {
    return (
        <div className="flex items-center bg-[#1e1f22] px-4 py-3 rounded-lg cursor-pointer">
            {/* 아바타 */}
            <div className="relative">
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-15 h-15 rounded-full"
                />
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-4 border-[#1e1f22] rounded-full"></span>
                )}
            </div>

            {/* 유저 정보 */}
            <div className="ml-4">
                <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-lg leading-none">{username}</span>
                    <span className="text-gray-400 text-sm leading-tight">#{tag}</span>
                </div>
                <p className="text-[11px] mt-2 text-gray-400 flex items-center gap-1">
                    친구 5명 <span className="text-[5px] leading-none relative top-[-1.5px]">●</span> 서버 2개
                    <ActionTooltip side="top" align="center" label="goseungbeom5757 + #223388">
                        <div className="w-4 h-4 ml-1 flex items-center justify-center rounded-md bg-[#313338]">
                            <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-[#1ABC9C] text-black font-bold text-[12px]">
                                #
                            </div>
                        </div>
                    </ActionTooltip>
                </p>
            </div>
        </div>
    );
};

export default UserCard;
