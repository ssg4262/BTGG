// src/components/sidebar/main/MainSideBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    // iOS 느낌의 Heroicons (outline)
    ArrowTrendingUpIcon,
    StarIcon,
    ArrowsRightLeftIcon,
    CurrencyDollarIcon,
    ArrowUturnLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

type ItemKey = "crypto" | "fav" | "swap" | "fx";

type Props = {
    headerHeightPx?: number;
    defaultOpen?: boolean;
    defaultActive?: ItemKey;
    onChange?: (key: ItemKey) => void;
};

export const MainSideBar = ({
                                headerHeightPx = 56,
                                defaultOpen = false,
                                defaultActive = "crypto",
                                onChange,
                            }: Props) => {
    const [open, setOpen] = useState(defaultOpen);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [active, setActive] = useState<ItemKey>(defaultActive);

    useEffect(() => {
        document.body.style.overflow = sheetOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [sheetOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
        if (sheetOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [sheetOpen]);

    const items = useMemo(
        () => [
            { key: "crypto" as const, label: "암호화폐", Icon: ArrowTrendingUpIcon },
            { key: "fav" as const, label: "내 관심 목록", Icon: StarIcon },
            { key: "swap" as const, label: "교환", Icon: ArrowsRightLeftIcon },
            { key: "fx" as const, label: "환율", Icon: CurrencyDollarIcon },
        ],
        [],
    );

    const select = (k: ItemKey) => {
        setActive(k);
        onChange?.(k);
    };

    const top = `${headerHeightPx}px`;
    const h = `calc(100vh - ${headerHeightPx}px)`;
    const wClosed = 64;
    const wOpen = 272;

    const List = ({ wide }: { wide: boolean }) => (
        <div className="py-2">
            {items.map(({ key, label, Icon }) => {
                const on = key === active;
                return (
                    <button
                        key={key}
                        onClick={() => select(key)}
                        className={[
                            "relative w-full h-10 px-2.5 flex items-center gap-3 text-sm rounded-md transition-colors",
                            wide ? "justify-start" : "justify-center",
                            on
                                ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
                                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                        ].join(" ")}
                    >
                        <Icon className="h-5 w-5 shrink-0 opacity-90" />
                        {wide && <span className="truncate">{label}</span>}
                    </button>
                );
            })}
        </div>
    );

    const DesktopRail = (
        <aside
            className={[
                "hidden lg:flex flex-col",
                "sticky overflow-hidden transition-[width] duration-200",
                "bg-white text-black border-r border-zinc-200",
                "dark:bg-black dark:text-white dark:border-white/10",
            ].join(" ")}
            style={{ top, height: h, width: open ? wOpen : wClosed }}
        >
            <div className="h-2 shrink-0" />

            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <List wide={open} />
            </div>

            <div className="shrink-0">
                <button
                    className={[
                        "w-full h-10 px-2.5 flex items-center gap-3 text-sm rounded-md transition-colors",
                        "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                        open ? "justify-start" : "justify-center",
                    ].join(" ")}
                    onClick={() => select("crypto")}
                >
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                    {open && <span className="truncate">뒤로가기</span>}
                </button>

                <div className="h-px bg-zinc-200 dark:bg-white/10 my-1" />

                <button
                    className={[
                        "w-full h-10 px-2.5 flex items-center gap-3 text-sm rounded-md transition-colors",
                        "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                        open ? "justify-start" : "justify-center",
                    ].join(" ")}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
                        <>
                            <ChevronDoubleLeftIcon className="h-5 w-5" />
                            <span className="truncate">메뉴 접기</span>
                        </>
                    ) : (
                        <ChevronDoubleRightIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
        </aside>
    );

    const startY = useRef<number | null>(null);
    const translate = useRef(0);
    const onTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (startY.current == null) return;
        const dy = e.touches[0].clientY - startY.current;
        translate.current = Math.max(0, dy);
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${translate.current}px)`;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const dy = translate.current;
        (e.currentTarget as HTMLDivElement).style.transform = "";
        startY.current = null;
        translate.current = 0;
        if (dy > 80) setSheetOpen(false);
    };

    const MobileFloating = (
        <>
            <button
                onClick={() => setSheetOpen(true)}
                className="fixed bottom-5 left-5 z-40 lg:hidden
                   w-14 h-14 rounded-2xl
                   bg-white text-black dark:bg-black dark:text-white
                   border border-zinc-200 dark:border-white/10
                   shadow-lg flex items-center justify-center
                   active:scale-95 transition-transform"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            <div
                className={[
                    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden",
                    sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={() => setSheetOpen(false)}
            />

            <div
                role="dialog"
                className={[
                    "fixed inset-x-0 bottom-0 z-50 lg:hidden",
                    "rounded-t-2xl bg-white text-black dark:bg-black dark:text-white",
                    "border-t border-zinc-200 dark:border-white/10 shadow-2xl",
                    "transition-transform duration-200",
                    sheetOpen ? "translate-y-0" : "translate-y-full",
                ].join(" ")}
                style={{ maxHeight: "80vh" }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="py-3 grid place-items-center">
                    <div className="h-1.5 w-10 rounded-full bg-zinc-400 dark:bg-white/20" />
                </div>

                <div className="px-3 pb-3">
                    <div className="max-h-[60vh] overflow-y-auto">
                        <List wide />
                    </div>

                    <div className="mt-2 border-t border-zinc-200 dark:border-white/10">
                        <button
                            className="w-full h-12 px-4 text-left text-sm text-zinc-700 hover:text-black/80 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md"
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
            {DesktopRail}
            {MobileFloating}
        </>
    );
};
