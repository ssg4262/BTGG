import {useState, ReactNode, lazy, Suspense, JSX} from 'react';
import {
    Home,
    Send,
    Compass,
    CreditCard,
    Receipt,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import {useDarkMode} from "@/hooks/useDarkMode.ts";

interface NavItemProps {
    icon: ReactNode;
    label: string;
    active?: boolean;
    hasArrow?: boolean;
    tag?: string;
}

const navItems: NavItemProps[] = [
    { icon: <Home size={18} />, label: 'Dashboard' },
    { icon: <Send size={18} />, label: 'Move crypto', hasArrow: true },
    { icon: <Compass size={18} />, label: 'Discover', active: true },
    { icon: <CreditCard size={18} />, label: 'Card', tag: 'Pilot' },
    { icon: <Receipt size={18} />, label: 'Tax Hub', tag: 'Beta' },
];

const NavItem = lazy(() => import('@/components/navigation/NavItem'));

export const MainSidebar = (): JSX.Element => {
    const [open, setOpen] = useState(true);
    const [isDark, setIsDark] = useDarkMode()
    return (
        <aside
            className={`${
                open ? 'w-56' : 'w-20'
            } transition-all duration-300 h-screen bg-[#1E1E1E] text-white flex flex-col justify-between fixed top-0 left-0 z-40 overflow-hidden border-r border-[#2A2A2A]`}
        >
            <div className="p-10 bg-white text-black dark:bg-black dark:text-white">
                다크모드 테스트 박스
            </div>
            <button
                onClick={() => setIsDark(!isDark)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            >
                {isDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
            </button>
            <div>
                {/* Logo */}
                <div className="px-4 py-6 text-center">
                    <h1 className={`font-bold text-2xl leading-tight transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        Meta<br />Mask
                    </h1>
                    {!open && <div className="text-sm font-bold">MM</div>}
                </div>

                {/* Nav Items */}
                <nav className="space-y-1 px-2">
                    <Suspense fallback={<div className="text-gray-400 px-3 py-2">Loading...</div>}>
                        {navItems.map((item, idx) => (
                            <NavItem key={idx} {...item} />
                        ))}
                    </Suspense>
                </nav>
            </div>

            {/* Footer + Toggle */}
            <div className="px-2 py-4 flex flex-col gap-3 items-center border-t border-[#2A2A2A]">
                <a
                    href="#"
                    className={`text-xs text-gray-500 hover:underline flex items-center gap-1 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 hidden'}`}
                >
                    Terms of Use
                </a>

                {/* Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-8 h-8 rounded-full bg-[#2F2F2F] hover:bg-[#3A3A3A] flex items-center justify-center text-gray-300 border border-[#3F3F3F]"
                >
                    {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </div>
        </aside>
    );
};
