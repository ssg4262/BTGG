// src/components/sidebar/main/MainSideBar.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
    BarChart3, Star, Zap, RefreshCcw,
    ArrowLeft, PanelLeftClose, PanelLeftOpen, Menu
} from "lucide-react";

/** 데스크탑: 좌측 고정 레일(56↔272) / 모바일: iOS 바텀시트(플로팅) */
type ItemKey = "crypto" | "fav" | "swap" | "fx";

type Props = {
    headerHeightPx?: number;   // TopNav 높이(기본 56)
    defaultOpen?: boolean;     // 데스크탑 레일 시작 상태
    defaultActive?: ItemKey;   // 초기 활성 메뉴
    onChange?: (key: ItemKey) => void;
};

export const MainSideBar = ({
                                headerHeightPx = 56,
                                defaultOpen = false,
                                defaultActive = "crypto",
                                onChange,
                            }: Props) => {
    /* ───────── state ───────── */
    const [open, setOpen] = useState(defaultOpen); // desktop rail
    const [sheetOpen, setSheetOpen] = useState(false); // mobile sheet
    const [active, setActive] = useState<ItemKey>(defaultActive);

    useEffect(() => {
        document.body.style.overflow = sheetOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sheetOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
        if (sheetOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [sheetOpen]);

    const items = useMemo(
        () => ([
            { key: "crypto" as const, label: "암호화폐", Icon: BarChart3 },
            { key: "fav"    as const, label: "내 관심 목록", Icon: Star },
            { key: "swap"   as const, label: "교환", Icon: Zap },
            { key: "fx"     as const, label: "환율", Icon: RefreshCcw },
        ]),
        []
    );

    const select = (k: ItemKey) => { setActive(k); onChange?.(k); };

    const top = `${headerHeightPx}px`;
    const h = `calc(100vh - ${headerHeightPx}px)`;
    const wClosed = 56;
    const wOpen = 272;

    /* ───────── common list ───────── */
    const List = ({ wide }: { wide: boolean }) => (
        <div className="py-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {items.map(({ key, label, Icon }) => {
                const on = key === active;
                return (
                    <button
                        key={key}
                        onClick={() => select(key)}
                        className={[
                            "relative w-full h-11 px-3 flex items-center gap-3 text-sm",
                            wide ? "justify-start" : "justify-center",
                            on
                                ? "bg-zinc-200 text-zinc-900 dark:bg-[#1A1C19] dark:text-white"
                                : "text-zinc-700 hover:bg-zinc-100 dark:text-white/90 dark:hover:bg-white/5",
                        ].join(" ")}
                    >
                        {on && <span className="absolute right-0 top-0 h-full w-[3px] bg-[#B6FF34]" />}
                        <Icon className="size-5 shrink-0" />
                        {wide && <span className="truncate">{label}</span>}
                    </button>
                );
            })}
        </div>
    );

    /* ───────── desktop rail ───────── */
    const DesktopRail = (
        <aside
            className="hidden lg:block sticky overflow-hidden transition-[width] duration-200
                 bg-zinc-50 border-r border-zinc-200 text-zinc-900
                 dark:bg-[#151615] dark:border-white/10 dark:text-white"
            style={{ top, height: h, width: open ? wOpen : wClosed }}
        >
            <List wide={open} />

            <div className="mt-auto">
                <button
                    className={[
                        "w-full h-12 px-3 flex items-center gap-3 text-sm",
                        open ? "justify-start" : "justify-center",
                        "text-zinc-700 hover:bg-zinc-100 dark:text-white/80 dark:hover:bg-white/5",
                    ].join(" ")}
                    onClick={() => select("crypto")}
                    title="뒤로가기"
                >
                    <ArrowLeft className="size-5" />
                    {open && <span>뒤로가기</span>}
                </button>
                <div className="h-px bg-zinc-200 dark:bg-white/10" />
                <button
                    className={[
                        "w-full h-12 px-3 flex items-center gap-3 text-sm",
                        open ? "justify-start" : "justify-center",
                        "text-zinc-700 hover:bg-zinc-100 dark:text-white/80 dark:hover:bg-white/5",
                    ].join(" ")}
                    onClick={() => setOpen(v => !v)}
                    title={open ? "메뉴 접기" : "메뉴 열기"}
                >
                    {open ? <PanelLeftClose className="size-5" /> : <PanelLeftOpen className="size-5" />}
                    {open && <span>{open ? "메뉴 접기" : "메뉴 열기"}</span>}
                </button>
            </div>
        </aside>
    );

    /* ───────── mobile bottom sheet ───────── */
    // swipe to close
    const startY = useRef<number | null>(null);
    const translate = useRef(0);
    const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; };
    const onTouchMove = (e: React.TouchEvent) => {
        if (startY.current == null) return;
        const dy = e.touches[0].clientY - startY.current;
        translate.current = Math.max(0, dy);
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${translate.current}px)`;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const dy = translate.current;
        (e.currentTarget as HTMLDivElement).style.transform = "";
        startY.current = null; translate.current = 0;
        if (dy > 80) setSheetOpen(false);
    };

    const MobileFloating = (
        <>
            {/* 좌하단 고정 iOS 스타일 버튼 */}
            <button
                onClick={() => setSheetOpen(true)}
                aria-label="메뉴 열기"
                className="fixed bottom-5 left-5 z-40 lg:hidden
                   w-14 h-14 rounded-2xl
                   bg-white dark:bg-[#1A1C19]
                   flex items-center justify-center
                   shadow-md active:scale-95 transition-transform"
            >
                <Menu className="size-6 text-zinc-700 dark:text-white" />
            </button>

            {/* overlay */}
            <div
                className={[
                    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden",
                    sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={() => setSheetOpen(false)}
            />

            {/* sheet */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="메뉴"
                className={[
                    "fixed inset-x-0 bottom-0 z-50 lg:hidden",
                    "rounded-t-2xl bg-zinc-50 text-zinc-900 dark:bg-[#151615] dark:text-white shadow-2xl",
                    "transition-transform duration-200",
                    sheetOpen ? "translate-y-0" : "translate-y-full",
                ].join(" ")}
                style={{ maxHeight: "80vh" }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="py-3 grid place-items-center">
                    <div className="h-1.5 w-10 rounded-full bg-zinc-300 dark:bg-white/20" />
                </div>

                {/* lime strip */}
                <div className="h-[28px] border-b border-zinc-200 relative dark:border-white/10 bg-zinc-100 dark:bg-[#1a2c00] rounded-t-xl">
                    <span className="absolute right-0 top-0 h-full w-[3px] bg-[#B6FF34]" />
                </div>

                <div className="px-3 pb-3">
                    <div className="max-h-[60vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <List wide />
                    </div>

                    <div className="mt-2 border-t border-zinc-200 dark:border-white/10">
                        <button
                            className="w-full h-12 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-white/80 dark:hover:bg-white/5"
                            onClick={() => setSheetOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* 데스크탑(그리드 컬럼 차지) */}
            {DesktopRail}

            {/* 모바일 플로팅(그리드 밖 고정) */}
            {MobileFloating}
        </>
    );
};
