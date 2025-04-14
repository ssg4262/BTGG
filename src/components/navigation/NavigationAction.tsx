"use client"
import {Plus} from "lucide-react"
import {ActionTooltip} from "@/components/ui/ActionToolTip.tsx";
export const NavigationAction = () => {
    return (
        <ActionTooltip
            side="right"
            align="center"
            label="서버 추가하기"
        >
            <button
                className="group flex items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px]
                group-hover:rounded-[16px] transition-all
                overflow-hidden items-center justify-center
                bg-[rgb(43,45,49)]
                group-hover:bg-[rgb(99,99,99)]">
                    <Plus
                        className = "group-hover:text-white trasition text-[rgb(255,255,255)]"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}