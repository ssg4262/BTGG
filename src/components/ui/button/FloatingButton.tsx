import React from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Position =
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "center";

interface FloatingButtonProps {
    icon?: LucideIcon;
    text?: string;
    onClick?: () => void;
    className?: string;
    color?: string; // Tailwind 색상 클래스 (예: bg-black, bg-lime-500 등)
    position?: Position;
}

const positionClasses: Record<Position, string> = {
    "bottom-right": "bottom-10 right-10",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export const FloatingButton: React.FC<FloatingButtonProps> = ({
                                                                  icon: Icon,
                                                                  text,
                                                                  onClick,
                                                                  className = "",
                                                                  color = "bg-gray-800", // default: 무채색
                                                                  position = "bottom-right", // default 위치
                                                              }) => {
    return (
        <div
            className={clsx(
                "fixed z-50",
                positionClasses[position],
                "transition-all"
            )}
        >
            <button
                onClick={onClick}
                className={clsx(
                    "flex items-center justify-center p-3 rounded-full text-white shadow-lg hover:opacity-90 transition duration-300",
                    color,
                    className
                )}
            >
                {Icon ? <Icon className="w-5 h-5" /> : text}
            </button>
        </div>
    );
};
