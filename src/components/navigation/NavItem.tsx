import {JSX, ReactNode} from 'react';

interface NavItemProps {
    icon: ReactNode;
    label: string;
    active?: boolean;
    hasArrow?: boolean;
    tag?: string;
}

const NavItem = ({
                     icon,
                     label,
                     active = false,
                     hasArrow = false,
                     tag = '',
                 }: NavItemProps): JSX.Element => {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2A2A2A] cursor-pointer ${
                active ? 'text-[#7367F0] bg-[#2A2A2A]' : ''
            }`}
        >
            <div className="flex items-center gap-2">
                <span className="text-gray-300">{icon}</span>
                <span>{label}</span>
            </div>
            {tag && (
                <span className="text-xs bg-[#2F2F4F] text-[#A6A6FF] px-2 py-0.5 rounded-full">
          {tag}
        </span>
            )}
            {hasArrow && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-gray-400 ml-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            )}
        </div>
    );
};

export default NavItem;
