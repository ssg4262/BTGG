"use client";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/ToolTip.tsx";
import { ReactNode } from "react";

// Props 타입 정의
interface ActionTooltipProps {
    label: string;
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

export const ActionTooltip: React.FC<ActionTooltipProps> = ({
                                                                label,
                                                                children,
                                                                side = "top",
                                                                align = "center"
                                                            }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <div className="flex items-center space-x-2 z-40">
                    {/* TooltipTrigger */}
                    <TooltipTrigger asChild>
                        {children}
                    </TooltipTrigger>

                    {/* TooltipContent */}
                    <TooltipContent
                        side={side}
                        align={align}
                        className="bg-gray-800 text-white p-2 rounded-lg border-none shadow-lg z-50"
                    >
                        <p className="font-semibold text-sm capitalize">
                            {label?.toLowerCase()}
                        </p>
                    </TooltipContent>
                </div>
            </Tooltip>
        </TooltipProvider>
    );
};
