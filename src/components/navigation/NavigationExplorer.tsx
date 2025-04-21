"use client"
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";
import {CompassSVG} from "@/assets/svg/ui/CompassSVG";
import {useLocation, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.ts";

export const NavigationExplorer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === "/community";
    const handleNavigate = () => {
        navigate(`/community`); // 파라미터를 URL에 포함시켜 이동
    };
    return (
        <ActionTooltip
            side="right"
            align="center"
            label="커뮤니티 바로가기"
        >
            <button
                className="group flex items-center"
                onClick={() => handleNavigate()}

            >
                <div
                    className={cn(
                        "absolute left-0 rounded-r-full transition-all w-[4px]",
                        !isActive && "group-hover:h-[20px]",
                        isActive
                            ? "h-[36px] shadow-[0_0_10px_2px_rgba(233,233,233,0.4)] bg-[rgb(255,255,255)]"
                            : "h-[8px] opacity-80",
                        "transition-all duration-300 ease-in-out"
                    )}
                />
                <div
                    className={`flex mx-3 h-[40px] w-[40px] transition-all overflow-hidden items-center justify-center
                        ${isActive ? "rounded-[12px] bg-[rgb(88,101,242)]"
                        : "rounded-[12px] bg-[rgb(43,45,49)] group-hover:rounded-[12px] group-hover:bg-[rgb(88,101,242)]"}
                `}
                >
                    <CompassSVG
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}