// src/components/top/MainTopHeader.tsx
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/* ───────── Brand ───────── */
const Brand = () => (
    <div className="flex items-center gap-3">
    <span
        aria-label="BT.GG"
        className="inline-flex items-baseline gap-1 leading-none
               font-black tracking-[0.08em] text-[18px] sm:text-[20px]
               text-black dark:text-white"
    >
      <span>BTGG</span>
    </span>
    </div>
);

/* ───────── kbd ───────── */
const Key = ({ children }: { children: React.ReactNode }) => (
    <kbd
        className="rounded-md border border-black/10 bg-white px-2 py-[2px] text-[11px] text-black/70
               dark:border-white/10 dark:bg-[#2a2a2a] dark:text-white/70"
    >
        {children}
    </kbd>
);

export const MainTopHeader = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const reduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const mobilePanelId = useId();
    const searchDesktopRef = useRef<HTMLInputElement>(null);
    const searchMobileRef = useRef<HTMLInputElement>(null);
    const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

    /* 스크롤 시 스타일 */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* 모바일 열림: 바디 스크롤 잠금 + ESC + 최초포커스 */
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            firstMobileLinkRef.current?.focus();
        } else {
            document.body.style.overflow = "";
        }
        const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [open]);

    /* ⌘/Ctrl + K → 검색 포커스 */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            if (
                (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
                (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")
            ) {
                e.preventDefault();
                if (searchDesktopRef.current) searchDesktopRef.current.focus();
                else searchMobileRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const navItems = [
        { label: "Showcase", href: "#" ,ext: false  },
        { label: "Docs", href: "#" , ext: false },
        { label: "Blog", href: "#" ,ext: false  },
        { label: "Templates", href: "#", ext: true },
        { label: "Enterprise", href: "#", ext: true },
    ] as const;

    return (
        <header
            role="banner"
            className={clsx(
                "sticky top-0 z-50 w-full border-b transition-all",
                "bg-white/80 dark:bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60",
                scrolled
                    ? "border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                    : "border-transparent"
            )}
        >
            {/* Skip link */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 z-50 rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black"
            >
                Skip to content
            </a>

            {/* 상단 바 */}
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 py-2.5">
                {/* Brand */}
                <a
                    href="/"
                    className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded"
                >
                    <Brand />
                </a>

                {/* 데스크톱 네비 + 검색 (UI 개선) */}
                <div className="hidden md:flex items-center gap-7">
                    <nav
                        aria-label="Primary"
                        className="flex items-center gap-6 text-[13px] text-black/70 dark:text-white/70"
                    >
                        {navItems.map((n) => (
                            <a
                                key={n.label}
                                href={n.href}
                                className={clsx(
                                    "group relative inline-flex items-center gap-1 py-1 px-1 rounded-md",
                                    "hover:text-black dark:hover:text-white transition-colors",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/15"
                                )}
                            >
                                <span>{n.label}</span>
                                {n.ext && (
                                    <ArrowUpRight className="ml-0.5 h-[14px] w-[14px]" />
                                )}
                                {/* 고급 언더라인 */}
                                <span
                                    aria-hidden
                                    className={clsx(
                                        "absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full",
                                        "bg-black/70 dark:bg-white/80",
                                        !reduced && "transition-[width] duration-300",
                                        "group-hover:w-4/5"
                                    )}
                                />
                            </a>
                        ))}
                    </nav>

                    {/* 검색 */}
                    <div className="relative hidden lg:block">
                        <input
                            ref={searchDesktopRef}
                            placeholder="Search documentation..."
                            aria-label="Search"
                            className="h-9 w-[360px] rounded-[12px] border border-black/10 bg-zinc-100 pl-3 pr-14 text-[13px] text-black/80 placeholder-black/40
                         focus:outline-none focus:ring-2 focus:ring-black/10
                         dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white/80 dark:placeholder-white/40 dark:focus:ring-white/10"
                        />
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Key>⌘K</Key>
                        </div>
                    </div>
                </div>

                {/* 우측: CTA + Theme + 햄버거 */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <a
                        href="#"
                        className="hidden sm:inline-flex h-9 items-center gap-2 rounded-[10px] border border-black/15 bg-black px-3 text-[13px] text-white
                       hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                            <path d="M12 2L22 20H2L12 2Z" className="fill-white" />
                        </svg>
                        Deploy
                    </a>

                    <a
                        href="#"
                        className="hidden sm:inline-flex h-9 items-center rounded-[10px] border border-black/10 bg-white px-3 text-[13px] text-black
                       hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10
                       dark:border-white/20 dark:bg-white dark:text-black"
                    >
                        Learn
                    </a>

                    <ThemeToggle />

                    <button
                        className="ml-1 inline-flex items-center justify-center rounded-md p-1.5 md:hidden hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-controls={mobilePanelId}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* ☑️ 모바일 패널: 기존 방식 그대로 (max-height) */}
            <div
                id={mobilePanelId}
                className={clsx(
                    "md:hidden overflow-hidden border-t border-black/10 bg-white text-black dark:border-white/10 dark:bg-black dark:text-white",
                    reduced ? "" : "transition-[max-height] duration-300",
                    open ? "max-h-[460px]" : "max-h-0"
                )}
            >
                <div className="px-4 pb-4 pt-3 space-y-4">
                    {/* 검색 */}
                    <div className="relative">
                        <input
                            ref={searchMobileRef}
                            placeholder="Search documentation..."
                            aria-label="Search"
                            className="h-10 w-full rounded-[10px] border border-black/10 bg-zinc-100 pl-3 pr-14 text-[13px] text-black/80 placeholder-black/40
                         focus:outline-none focus:ring-2 focus:ring-black/10
                         dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white/80 dark:placeholder-white/40 dark:focus:ring-white/10"
                        />
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2">
                            <Key>⌘K</Key>
                        </div>
                    </div>

                    {/* 링크들 */}
                    <nav aria-label="Mobile" className="flex flex-col gap-1.5 text-[15px] text-black/80 dark:text-white/80">
                        {[
                            { label: "Showcase", href: "#" },
                            { label: "Docs", href: "#" },
                            { label: "Blog", href: "#" },
                            { label: "Templates", href: "#", ext: true },
                            { label: "Enterprise", href: "#", ext: true },
                        ].map((n, i) => (
                            <a
                                key={n.label}
                                ref={i === 0 ? firstMobileLinkRef : undefined}
                                href={n.href}
                                className="rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:bg-black/5 dark:focus-visible:bg-white/10"
                                onClick={() => setOpen(false)}
                            >
                                {n.label} {n.ext && <span className="ml-1">↗</span>}
                            </a>
                        ))}
                    </nav>

                    {/* CTA(모바일) */}
                    <div className="flex gap-2 pt-2">
                        <a
                            href="#"
                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-black/15 bg-black px-3 text-[13px] text-white
                         hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10"
                            onClick={() => setOpen(false)}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="shrink-0">
                                <path d="M12 2L22 20H2L12 2Z" className="fill-white" />
                            </svg>
                            Deploy
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 flex-1 items-center justify-center rounded-[10px] border border-black/10 bg-white px-3 text-[13px] text-black
                         hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10
                         dark:border-white/20 dark:bg-white dark:text-black"
                            onClick={() => setOpen(false)}
                        >
                            Learn
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
