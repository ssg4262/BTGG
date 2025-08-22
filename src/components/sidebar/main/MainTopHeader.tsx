"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** Vercel 삼각형 느낌의 심플 로고 (모드에 따라 색이 자연히 바뀜) */
const TriLogo = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="shrink-0">
        <path d="M12 2L22 20H2L12 2Z" className="fill-black dark:fill-white" />
    </svg>
);

export const MainTopHeader = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white text-black transition-colors duration-300 dark:border-white/10 dark:bg-black dark:text-white">
            {/* 컨테이너 */}
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 py-2.5">
                {/* 좌측: 로고+브랜드 */}
                <a href="/" className="flex items-center gap-3">
                    <span className="flex items-baseline gap-1">
                         <span className="font-bold text-[22px] tracking-[0.1em] font-archivo-black"></span>
                         <span className="text-[10px] font-semibold opacity-70 align-top"> </span>
                     </span>
                </a>

                {/* 중앙: 데스크탑 네비게이션 */}
                <nav className="hidden md:flex items-center gap-6 text-[13px] text-black/70 dark:text-white/70">
                    <a className="hover:text-black dark:hover:text-white" href="#">Showcase</a>
                    <a className="hover:text-black dark:hover:text-white" href="#">Docs</a>
                    <a className="hover:text-black dark:hover:text-white" href="#">Blog</a>
                    <a className="hover:text-black dark:hover:text-white" href="#">Templates<span className="ml-1">↗</span></a>
                    <a className="hover:text-black dark:hover:text-white" href="#">Enterprise<span className="ml-1">↗</span></a>
                </nav>

                {/* 우측: 검색 + 버튼 + 테마토글 + 햄버거 */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* 검색(데스크탑 전용) */}
                    <div className="relative hidden lg:block">
                        <input
                            placeholder="Search documentation..."
                            className="h-8 w-[360px] rounded-[10px] border border-black/10 bg-zinc-100 pl-3 pr-14 text-[13px] text-black/80 placeholder-black/40
                         focus:outline-none focus:ring-2 focus:ring-black/10
                         dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white/80 dark:placeholder-white/40 dark:focus:ring-white/10"
                        />
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <kbd className="rounded-md border border-black/10 bg-white px-2 py-[2px] text-[11px] text-black/70 dark:border-white/10 dark:bg-[#2a2a2a] dark:text-white/70">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Deploy 버튼(검정) */}
                    <a
                        href="#"
                        className="hidden sm:inline-flex h-8 items-center gap-2 rounded-[10px] border border-black/15 bg-black px-3 text-[13px] text-white
                       hover:bg-black/90 dark:border-white/10"
                    >
                        <TriLogo />
                        Deploy
                    </a>

                    {/* Learn 버튼(화이트) */}
                    <a
                        href="#"
                        className="hidden sm:inline-flex h-8 items-center rounded-[10px] border border-black/10 bg-white px-3 text-[13px] text-black
                       hover:bg-zinc-100 dark:border-white/20 dark:bg-white dark:text-black"
                    >
                        Learn
                    </a>

                    {/* 테마 토글 */}
                    <ThemeToggle />

                    {/* 햄버거 (모바일) */}
                    <button
                        className="ml-1 inline-flex items-center justify-center rounded-md p-1.5 md:hidden hover:bg-black/5 dark:hover:bg-white/10"
                        aria-label="Open menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* 모바일 드롭다운 메뉴 */}
            <div
                className={clsx(
                    "md:hidden overflow-hidden border-t border-black/10 bg-white text-black transition-all duration-300 dark:border-white/10 dark:bg-black dark:text-white",
                    open ? "max-h-[420px]" : "max-h-0"
                )}
            >
                <div className="px-4 pb-4 pt-3 space-y-4">
                    {/* 모바일 검색 */}
                    <div className="relative">
                        <input
                            placeholder="Search documentation..."
                            className="h-10 w-full rounded-[10px] border border-black/10 bg-zinc-100 pl-3 pr-14 text-[13px] text-black/80 placeholder-black/40
                         focus:outline-none focus:ring-2 focus:ring-black/10
                         dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white/80 dark:placeholder-white/40 dark:focus:ring-white/10"
                        />
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2">
                            <kbd className="rounded-md border border-black/10 bg-white px-2 py-[2px] text-[11px] text-black/70 dark:border-white/10 dark:bg-[#2a2a2a] dark:text-white/70">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* 메뉴 링크 */}
                    <nav className="flex flex-col gap-2 text-[15px] text-black/80 dark:text-white/80">
                        <a className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10" href="#">Showcase</a>
                        <a className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10" href="#">Docs</a>
                        <a className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10" href="#">Blog</a>
                        <a className="rounded-md px-2 py-2 hover:bg黑/5 dark:hover:bg-white/10" href="#">Templates ↗</a>
                        <a className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10" href="#">Enterprise ↗</a>
                    </nav>

                    {/* 버튼들(모바일) */}
                    <div className="flex gap-2 pt-2">
                        <a
                            href="#"
                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-black/15 bg-black px-3 text-[13px] text-white hover:bg-black/90 dark:border-white/10"
                        >
                            <TriLogo />
                            Deploy
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 flex-1 items-center justify-center rounded-[10px] border border-black/10 bg-white px-3 text-[13px] text-black hover:bg-zinc-100 dark:border-white/20 dark:bg-white dark:text-black"
                        >
                            Learn
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
