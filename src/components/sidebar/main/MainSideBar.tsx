"use client";
import {
    Home,
    Send,
    Compass,
    CreditCard,
    FileText,
    ExternalLink,
} from "lucide-react";

type MenuItemProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: string;
    hasArrow?: boolean;
};
export const MainSideBar = () => {
    return (
        <>
            {/* 상단 로고 */}
            <div className="p-6">
                <div className="flex items-center space-x-2 pr-6 ml-2">
                    <div className="flex flex-col text-white font-bold text-[31px] leading-none font-BlackHanSans mt-3">
                        <span>META</span>
                        <span>DROP</span>
                    </div>
                </div>
            </div>

            {/* 중앙 메뉴 */}
            <nav className="flex-1 flex flex-col gap-1 px-4 text-[15px] font-medium">
                <MenuItem icon={<Home size={18} />} label="Dashboard" />
                <MenuItem icon={<Send size={18} />} label="Move crypto" hasArrow />
                <MenuItem icon={<Compass size={18} />} label="Discover" active />
                <MenuItem icon={<CreditCard size={18} />} label="Card" badge="Pilot" />
                <MenuItem icon={<FileText size={18} />} label="Tax Hub" badge="Beta" />
            </nav>

            {/* 하단 고정 영역 */}
            <div className="px-4 py-5 border-t border-[#2e2e2e] text-sm text-zinc-400 flex items-center justify-between">
                <span>Terms of Use</span>
                <ExternalLink size={14} />
            </div>
        </>
    );
};
const MenuItem = ({ icon, label, active, badge, hasArrow }: MenuItemProps) => {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                active ? "text-[#6C6CFF] font-semibold" : "text-zinc-300"
            } hover:bg-[#2e2e2e]`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && (
                <span className="text-xs bg-[#6C6CFF]/20 text-[#6C6CFF] px-2 py-0.5 rounded-full">
          {badge}
        </span>
            )}
            {hasArrow && (
                <svg
                    className="w-4 h-4 ml-2 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            )}
        </div>
    );
}


