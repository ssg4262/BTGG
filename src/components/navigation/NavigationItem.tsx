"use client";
import React from "react";
import { ActionTooltip } from "@/components/ui/ActionToolTip.tsx";
import { Img } from "react-image";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import { cn } from "@/lib/utils.ts";

// Props 타입 정의
interface NavigationItemProps {
    id: string;
    imageUrl?: string;
    name: string;
    className?: string; // ✅ className 추가
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
                                                                  id,
                                                                  imageUrl,
                                                                  name,
                                                                  className // ✅ 추가
                                                              }) => {
    const navigate = useNavigate();
    const params = useParams<{ serverId?: string }>(); // URL 파라미터 타입 지정

    const handleNavigate = (paramId: string) => {
        navigate(`/${paramId}`); // 파라미터를 URL에 포함시켜 이동
    };

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={() => handleNavigate(id)}
                className={cn("group relative flex items-center", className)} // ✅ className 적용
            >
                {/* 좌측 상태 바 */}
                <div
                    className={cn(
                        "absolute left-0 rounded-r-full transition-all w-[4px]",
                        params?.serverId !== id && "group-hover:h-[20px]",
                        params?.serverId === id
                            ? "h-[36px] shadow-[0_0_10px_2px_rgba(233,233,233,0.4)] bg-[rgb(255,255,255)]"
                            : "h-[8px] opacity-80",
                        "transition-all duration-300 ease-in-out"
                    )}
                />
                {/* 서버 아이콘 */}
                <div
                    className={cn(
                        "relative flex mx-3 h-[40px] w-[40px] rounded-[12px] " +
                        "transition-all overflow-hidden bg-[rgb(43,45,49)]",
                        params?.serverId === id && "bg-[rgb(43,45,49)] text-white rounded-[12px]"
                    )}
                >
                    {imageUrl ? (
                        <Img src={imageUrl} alt="channel" />
                    ) : (
                        <p className="text-white">{name}</p>
                    )}
                </div>
            </button>
        </ActionTooltip>
    );
};
