// src/components/news/CryptoNewsRail.tsx
import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    useCallback,
    PointerEvent,
} from "react";

/* =========================
   DATA (RSS via CORS proxy)
========================= */
const ORIGIN = "https://api.allorigins.win/get?url=";

// 한국어 코인 뉴스 소스 (필요시 추가/교체 가능)
const SOURCES = [
    { name: "토큰포스트", url: "https://www.tokenpost.kr/rss" },
    { name: "블록미디어", url: "https://www.blockmedia.co.kr/feed" },
    { name: "파이낸셜뉴스-블록체인", url: "https://www.fnnews.com/category/it-blockchain/feed" },
    {
        name: "구글뉴스-가상화폐",
        url:
            "https://news.google.com/rss/search?q=%EA%B0%80%EC%83%81%ED%99%94%ED%8F%90+OR+%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8&hl=ko&gl=KR&ceid=KR:ko",
    },
];

type NewsItem = {
    id: string;
    title: string;
    excerpt: string;
    url: string;
    source: string;
    imageUrl?: string | null;
    publishedAt: string; // ISO
};

const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.max(1, Math.round(diff / 60000));
    if (m < 60) return `${m}분 전`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h}시간 전`;
    const d = Math.round(h / 24);
    return `${d}일 전`;
};

const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const parseRSS = (xmlStr: string, sourceName: string): NewsItem[] => {
    const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
    const nodes = Array.from(doc.querySelectorAll("item, entry"));
    return nodes.map((node, idx) => {
        const title = node.querySelector("title")?.textContent?.trim() || "(제목 없음)";
        const link =
            node.querySelector("link")?.getAttribute("href") ||
            node.querySelector("link")?.textContent ||
            "#";
        const pub =
            node.querySelector("pubDate")?.textContent ||
            node.querySelector("updated")?.textContent ||
            node.querySelector("published")?.textContent ||
            new Date().toISOString();
        const desc =
            node.querySelector("description")?.textContent ||
            (node.querySelector("content\\:encoded") as any)?.textContent ||
            node.querySelector("content")?.textContent ||
            "";

        // 이미지 추출
        let image: string | null = null;
        const media = node.querySelector("media\\:content, content");
        const enclosure = node.querySelector("enclosure");
        const imgInHtml = /<img[^>]+src=["']([^"']+)["']/i.exec(desc || "");
        if (media?.getAttribute("url")) image = media.getAttribute("url");
        else if (enclosure?.getAttribute("url")) image = enclosure.getAttribute("url");
        else if (imgInHtml) image = imgInHtml[1];

        return {
            id: `${sourceName}_${idx}_${link}`,
            title,
            excerpt: stripHtml(desc).slice(0, 160),
            url: link,
            source: sourceName,
            imageUrl: image,
            publishedAt: new Date(pub).toISOString(),
        };
    });
};

/* =========================
   CARD (클릭 → 링크, 드래그 억제, 썸네일/효과)
========================= */
const CARD_W = 480;
const CARD_H = 106;

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    // 드래그 중 클릭 방지
    const downPos = useRef<{ x: number; y: number } | null>(null);
    const suppressClick = useRef(false);

    const onPointerDownCard = (e: React.PointerEvent) => {
        downPos.current = { x: e.clientX, y: e.clientY };
        suppressClick.current = false;
    };
    const onPointerUpCard = (e: React.PointerEvent) => {
        if (!downPos.current) return;
        const dx = Math.abs(e.clientX - downPos.current.x);
        const dy = Math.abs(e.clientY - downPos.current.y);
        if (dx > 6 || dy > 6) suppressClick.current = true; // 끌었으면 클릭 막기
        downPos.current = null;
    };

    // 마우스 틸트(가벼운 3D)
    const onMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${py * -4}deg) rotateY(${px * 6}deg)`;
    };
    const resetTilt = () => {
        const el = cardRef.current;
        if (el) el.style.transform = `perspective(800px) rotateX(0) rotateY(0)`;
    };

    const favicon =
        item.url
            ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                new URL(item.url).hostname
            )}&sz=64`
            : undefined;

    return (
        <a
            ref={cardRef}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={[
                "snap-start relative",
                `min-w-[${CARD_W}px] h-[${CARD_H}px]`,
                "rounded-2xl border border-white/10 bg-[#1c1d1f]",
                "px-5 py-3 flex items-center justify-between",
                "transition-[transform,border-color,background] duration-200 will-change-transform",
                "hover:bg-[#202225] hover:border-white/20 cursor-pointer",
            ].join(" ")}
            onPointerDown={onPointerDownCard}
            onPointerUp={onPointerUpCard}
            // 🚩 드래그로 스크롤한 경우만 내비게이션 취소
            onClickCapture={(e) => {
                if (suppressClick.current) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
            onMouseMove={onMove}
            onMouseLeave={resetTilt}
        >
            {/* 왼쪽 텍스트 */}
            <div className="pr-4 min-w-0">
                <div className="flex items-center gap-2 text-[12px] text-white/70 font-semibold uppercase tracking-wide">
                    {favicon && (
                        <img src={favicon} alt="" className="h-3.5 w-3.5 rounded-sm opacity-90" />
                    )}
                    <span className="truncate">{item.source}</span>
                </div>
                <h3 className="mt-1 text-[15px] font-semibold text-white truncate">
                    {item.title}
                </h3>
                <p className="mt-0.5 text-[13px] text-white/65 truncate">{item.excerpt}</p>
                <div className="mt-1 text-[13px] font-semibold text-emerald-400">
                    {timeAgo(item.publishedAt)}
                </div>

                {/* 바닥 헤어라인 */}
                <div className="absolute left-4 right-4 bottom-0 h-px bg-white/10 rounded-full" />
            </div>

            {/* 오른쪽 썸네일: 블러 배경 + 전경 + 쉼머 */}
            <div className="relative shrink-0 w-[92px] h-[92px] rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <div
                    className={[
                        "absolute inset-0",
                        item.imageUrl && !error ? "opacity-100" : "opacity-0",
                        "transition-opacity",
                    ].join(" ")}
                    style={{
                        backgroundImage:
                            item.imageUrl && !error ? `url(${item.imageUrl})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(12px) brightness(0.85)",
                        transform: "scale(1.1)",
                    }}
                />
                {item.imageUrl && !error ? (
                    <img
                        src={item.imageUrl}
                        alt={item.source}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="relative z-10 w-full h-full grid place-items-center text-xl">
                        📰
                    </div>
                )}
                {!loaded && !error && (
                    <div className="absolute inset-0 z-20 overflow-hidden">
                        <div className="absolute inset-0 bg-white/5" />
                        <div className="absolute inset-0 animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                )}
            </div>
        </a>
    );
};

/* =========================
   RAIL (호버 시 화살표 표시, 스냅, 드래그 스크럽)
========================= */
export const CryptoNewsRail: React.FC = () => {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            const results = await Promise.allSettled(
                SOURCES.map(async (s) => {
                    const r = await fetch(ORIGIN + encodeURIComponent(s.url));
                    if (!r.ok) throw new Error(`${s.name} HTTP ${r.status}`);
                    const j = await r.json();
                    return parseRSS(j?.contents as string, s.name);
                })
            );
            const merged: NewsItem[] = [];
            results.forEach((res) => {
                if (res.status === "fulfilled") merged.push(...(res as any).value);
            });
            merged.sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
            setItems(merged.slice(0, 36));
        } catch (e) {
            console.error(e);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    // 스크롤/컨트롤
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateArrows = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanLeft(scrollLeft > 2);
        setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
    }, []);

    useEffect(() => {
        updateArrows();
        const el = scrollerRef.current;
        if (!el) return;
        const onScroll = () => updateArrows();
        el.addEventListener("scroll", onScroll, { passive: true });
        const ro = new ResizeObserver(updateArrows);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, [updateArrows, items.length]);

    const scrollByCard = (dir: "left" | "right") => {
        const el = scrollerRef.current;
        if (!el) return;
        const delta = (CARD_W + 12) * (dir === "left" ? -1 : 1);
        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    // 드래그 스크럽
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startLeft = useRef(0);

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        const el = scrollerRef.current;
        if (!el) return;
        isDragging.current = true;
        startX.current = e.clientX;
        startLeft.current = el.scrollLeft;
        el.setPointerCapture?.((e as any).pointerId);
        el.style.scrollSnapType = "none";
    };
    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const el = scrollerRef.current;
        if (!el) return;
        const dx = e.clientX - startX.current;
        el.scrollLeft = startLeft.current - dx;
    };
    const onPointerUp = () => {
        const el = scrollerRef.current;
        if (!el) return;
        isDragging.current = false;
        el.style.scrollSnapType = "x mandatory";
        updateArrows();
    };

    // 키보드 + 오토플레이
    useEffect(() => {
        const key = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") scrollByCard("left");
            if (e.key === "ArrowRight") scrollByCard("right");
        };
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, []);

    const autoplayRef = useRef<number | null>(null);
    const [autoplay, setAutoplay] = useState(true);
    useEffect(() => {
        if (!autoplay) {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
            autoplayRef.current = null;
            return;
        }
        autoplayRef.current = window.setInterval(() => {
            const el = scrollerRef.current;
            if (!el) return;
            if (!canRight) el.scrollTo({ left: 0, behavior: "smooth" });
            else scrollByCard("right");
        }, 4000);
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        };
    }, [autoplay, canRight]);

    // 콘텐츠
    const content = useMemo(() => {
        if (loading) {
            return Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={`skel_${i}`}
                    className={`min-w-[${CARD_W}px] h-[${CARD_H}px] rounded-2xl bg-[#1c1d1f] border border-white/10 animate-pulse`}
                />
            ));
        }
        if (!items.length) {
            return (
                <div className={`min-w-full h-[${CARD_H}px] grid place-items-center text-sm text-white/60`}>
                    최근 뉴스가 없어요.
                </div>
            );
        }
        return items.map((n, i) => (
            <React.Fragment key={n.id}>
                <NewsCard item={n} />
                {i !== items.length - 1 && (
                    <div className="h-[72px] w-px self-center bg-white/12" />
                )}
            </React.Fragment>
        ));
    }, [items, loading]);

    return (
        <section className="w-full">
            {/* 헤더 */}
            <div className="mb-2 flex items-center gap-2">
                <h2 className="text-sm font-semibold text-white/85">코인 뉴스</h2>
                <button
                    onClick={load}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                >
                    새로고침
                </button>
                <button
                    onClick={() => setAutoplay((v) => !v)}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                >
                    {autoplay ? "일시정지" : "자동넘김"}
                </button>
            </div>

            {/* 레일 (호버 시 화살표 표시, 끝단 마스크) */}
            <div className="relative group">
                <div
                    ref={scrollerRef}
                    className={[
                        "w-full overflow-x-auto scroll-smooth snap-x snap-mandatory",
                        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                        "cursor-grab active:cursor-grabbing",
                    ].join(" ")}
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                        maskImage:
                            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <div className="flex gap-3 min-w-full px-6">{content}</div>
                </div>

                {/* 좌/우 칩형 화살표 — 호버시에만 보임 */}
                <button
                    onClick={() => scrollByCard("left")}
                    disabled={!canLeft}
                    className={[
                        "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                        "h-8 w-8 rounded-full grid place-items-center",
                        "bg-zinc-800/90 border border-white/10 text-white/80 hover:text-white shadow",
                        "disabled:opacity-40 disabled:pointer-events-none",
                        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                        "transition-opacity duration-150",
                    ].join(" ")}
                    aria-label="prev"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 6l-6 6 6 6" />
                    </svg>
                </button>

                <button
                    onClick={() => scrollByCard("right")}
                    disabled={!canRight}
                    className={[
                        "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                        "h-8 w-8 rounded-full grid place-items-center",
                        "bg-zinc-800/90 border border-white/10 text-white/80 hover:text-white shadow",
                        "disabled:opacity-40 disabled:pointer-events-none",
                        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                        "transition-opacity duration-150",
                    ].join(" ")}
                    aria-label="next"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>
            </div>

            {/* shimmer keyframes */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </section>
    );
};

