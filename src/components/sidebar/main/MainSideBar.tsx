// src/components/sidebar/main/MainSideBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    // iOS 톤의 Heroicons(Outline)
    ArrowTrendingUpIcon,
    StarIcon,
    ArrowsRightLeftIcon,
    CurrencyDollarIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowUturnLeftIcon,
    Bars3Icon,
    PlusIcon,
    HashtagIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

/** 상단 아이콘 레일 키 */
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
    /** 상태 */
    const [open, setOpen] = useState(defaultOpen);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [active, setActive] = useState<ItemKey>(defaultActive);

    /** 더미 데이터 (펼친 목록용) */
    const favorites = [{ id: "pelican", name: "Pelican room" }];
    const dms = [
        { id: "u1", name: "Jeremy Firow",        avatar: "🟢", unread: 0 },
        { id: "u2", name: "Mariusz Jaders",      avatar: "🧑‍🚀", unread: 1 },
        { id: "u3", name: "Emil Anders",         avatar: "🟣", unread: 0 },
        { id: "u4", name: "Markus Meyer",        avatar: "⚪️", unread: 0 },
    ];
    const groups = [
        { id: "g1", name: "Crypto",   unread: 0 },
        { id: "g2", name: "Futures",  unread: 0 },
        { id: "g3", name: "Finance",  unread: 0, strong: true },
        { id: "g4", name: "Stocktalk Germany", unread: 8 },
    ];

    /** 상단 기능 아이콘 리스트 */
    const topItems = useMemo(
        () => ([
            { key: "crypto" as const, label: "암호화폐", Icon: ArrowTrendingUpIcon },
            { key: "fav"    as const, label: "내 관심 목록", Icon: StarIcon },
            { key: "swap"   as const, label: "교환", Icon: ArrowsRightLeftIcon },
            { key: "fx"     as const, label: "환율", Icon: CurrencyDollarIcon },
        ]),
        []
    );

    const select = (k: ItemKey) => { setActive(k); onChange?.(k); };

    /** 레이아웃 토큰 */
    const top = `${headerHeightPx}px`;
    const h   = `calc(100vh - ${headerHeightPx}px)`;
    const wClosed = 64;
    const wOpen   = 272;

    /** ————————————————— 아이콘 레일 (공통) ————————————————— */
    const IconRail = ({ wide }: { wide: boolean }) => (
        <div className="py-2">
            {topItems.map(({ key, label, Icon }) => {
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

    /** ———————————————— 펼친 목록(Discord-like) ———————————————— */
    const ExpandedList = () => (
        <div className="px-2 pb-2 text-sm">
            {/* Search */}
            <div className="px-1 pt-1">
                <div className="flex items-center gap-2 rounded-md bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 px-2 h-8">
                    <MagnifyingGlassIcon className="h-4 w-4 opacity-70" />
                    <input
                        placeholder="Search"
                        className="bg-transparent outline-none text-sm w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    />
                </div>
            </div>

            {/* Favorites */}
            <SectionHeader title="FAVORITES">
                <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-white/5">
                    <PlusIcon className="h-4 w-4" />
                </button>
            </SectionHeader>
            <div className="space-y-1">
                {favorites.map(f => (
                    <Row key={f.id} active={false}>
                        <span className="truncate">{f.name}</span>
                    </Row>
                ))}
            </div>

            {/* Direct Messages */}
            <SectionHeader title="DIRECT MESSAGES">
                <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-white/5">
                    <PlusIcon className="h-4 w-4" />
                </button>
            </SectionHeader>
            <div className="space-y-1">
                {dms.map(u => (
                    <Row key={u.id} active={false}>
                        <Avatar seed={u.avatar} />
                        <span className="truncate">{u.name}</span>
                        {!!u.unread && (
                            <Badge>{u.unread}</Badge>
                        )}
                    </Row>
                ))}
            </div>

            {/* Groups */}
            <SectionHeader title="GROUPS">
                <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-white/5">
                    <PlusIcon className="h-4 w-4" />
                </button>
            </SectionHeader>
            <div className="space-y-1">
                {groups.map(g => (
                    <Row key={g.id} active={!!g.strong}>
                        <HashtagIcon className="h-4 w-4 opacity-80" />
                        <span className={["truncate", g.strong ? "font-semibold" : ""].join(" ")}>{g.name}</span>
                        {!!g.unread && <Badge>{g.unread}</Badge>}
                    </Row>
                ))}
            </div>
        </div>
    );

    /** ————————————————— 데스크탑 레일 ————————————————— */
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
            {/* 상단 간격 */}
            <div className="h-2 shrink-0" />

            {/* 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {/* 아이콘 레일은 항상 상단에 */}
                <IconRail wide={open} />
                {/* 펼쳐졌을 때만 상세 목록 노출 */}
                {open && <ExpandedList />}
            </div>

            {/* 하단 컨트롤 */}
            <div className="shrink-0">
                <button
                    className={[
                        "w-full h-10 px-2.5 flex items-center gap-3 text-sm rounded-md transition-colors",
                        "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
                        open ? "justify-start" : "justify-center",
                    ].join(" ")}
                    onClick={() => select("crypto")}
                    title="뒤로가기"
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
                    onClick={() => setOpen(v => !v)}
                    title={open ? "메뉴 접기" : "메뉴 열기"}
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

    /** ————————————————— 모바일 바텀시트 ————————————————— */
    const startY = useRef<number | null>(null);
    const translate = useRef(0);
    const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; };
    const onTouchMove  = (e: React.TouchEvent) => {
        if (startY.current == null) return;
        const dy = e.touches[0].clientY - startY.current;
        translate.current = Math.max(0, dy);
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${translate.current}px)`;
    };
    const onTouchEnd   = (e: React.TouchEvent) => {
        const dy = translate.current;
        (e.currentTarget as HTMLDivElement).style.transform = "";
        startY.current = null; translate.current = 0;
        if (dy > 80) setSheetOpen(false);
    };

    const MobileFloating = (
        <>
            {/* 트리거 */}
            <button
                onClick={() => setSheetOpen(true)}
                className="fixed bottom-5 left-5 z-40 lg:hidden
                   w-14 h-14 rounded-2xl
                   bg-white text-black dark:bg-black dark:text-white
                   border border-zinc-200 dark:border-white/10
                   shadow-lg flex items-center justify-center
                   active:scale-95 transition-transform"
                aria-label="메뉴 열기"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            {/* 오버레이 */}
            <div
                className={[
                    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden",
                    sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={() => setSheetOpen(false)}
            />

            {/* 시트 */}
            <div
                role="dialog"
                className={[
                    "fixed inset-x-0 bottom-0 z-50 lg:hidden",
                    "rounded-t-2xl bg-white text-black dark:bg-black dark:text-white",
                    "border-t border-zinc-200 dark:border-white/10 shadow-2xl",
                    "transition-transform duration-200",
                    sheetOpen ? "translate-y-0" : "translate-y-full",
                ].join(" ")}
                style={{ maxHeight: "82vh" }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="py-3 grid place-items-center">
                    <div className="h-1.5 w-10 rounded-full bg-zinc-400 dark:bg-white/20" />
                </div>

                <div className="px-3 pb-3">
                    <div className="max-h-[68vh] overflow-y-auto">
                        {/* 모바일도 동일한 확장 리스트만 노출 */}
                        <ExpandedList />
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

/* ─────────────────────── 서브 컴포넌트 ─────────────────────── */

const SectionHeader = ({
                           title,
                           children,
                       }: { title: string; children?: React.ReactNode }) => (
    <div className="mt-3 mb-2 px-1 flex items-center justify-between text-[11px] tracking-wide text-zinc-500 dark:text-zinc-400">
        <span>{title}</span>
        <div className="flex items-center gap-1">{children}</div>
    </div>
);

const Row = ({
                 children,
                 active,
             }: { children: React.ReactNode; active?: boolean }) => (
    <button
        className={[
            "w-full h-9 px-2 rounded-md flex items-center gap-2",
            active
                ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5",
        ].join(" ")}
    >
        {children}
    </button>
);

const Avatar = ({ seed }: { seed: string }) => (
    <span className="inline-grid place-items-center h-5 w-5 rounded-full bg-zinc-200 text-[11px] dark:bg-zinc-700">
    {seed}
  </span>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="ml-auto inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full
                   bg-blue-500 text-white text-[11px] px-1">
    {children}
  </span>
);
