import { useRef, useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import doodle from "@/assets/img/nft/Doodle.png";

type Props = {
    onFirstImageColorExtract?: (color: string) => void;
};

const mockData = [
    {
        title: "Doodles",
        imageUrl: doodle,
        floorPrice: "2.87 ETH",
        isVerified: true,
    },
    {
        title: "When Two Stars Collide",
        imageUrl: "https://i.seadn.io/gae/...jpg",
        floorPrice: "—",
    },
    {
        title: "Letters by Vinnie Hager",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "0.4 ETH",
    },
    {
        title: "Murakami.Flowers Official",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "0.24 ETH",
    },
    {
        title: "Azuki",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "1.0 ETH",
    },
    {
        title: "CloneX",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "1.1 ETH",
    },
    {
        title: "Cool Cats",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "0.8 ETH",
    },
    {
        title: "Other",
        imageUrl: "https://i.seadn.io/gae/...png",
        floorPrice: "0.5 ETH",
    },
];

export const CollectionList = ({ onFirstImageColorExtract }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const firstImgRef = useRef<HTMLImageElement | null>(null);
    const [cardWidth, setCardWidth] = useState<number>(0);

    useEffect(() => {
        if (!firstImgRef.current || !onFirstImageColorExtract) return;

        const fac = new FastAverageColor();
        const img = firstImgRef.current;

        const handleColorExtract = () => {
            fac.getColorAsync(img).then((color) => {
                onFirstImageColorExtract(color.rgb);
            });
        };

        if (img.complete) {
            handleColorExtract();
        } else {
            img.onload = handleColorExtract;
        }
    }, [onFirstImageColorExtract]);

    useEffect(() => {
        const card = document.querySelector(".collection-card");
        if (card) {
            const width = (card as HTMLElement).offsetWidth;
            setCardWidth(width);
        }
    }, []);

    const scrollByCards = (direction: "left" | "right") => {
        if (scrollRef.current && cardWidth > 0) {
            const scrollAmount = cardWidth * 4 + 16 * 3;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative group overflow-hidden w-full p-3">
            {/* Left Area */}
            <div
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-100 z-10 hidden group-hover:flex items-center justify-center
             rounded-lg bg-white/10 backdrop-blur-lg to-transparent shadow-lg
             transition hover:scale-105 cursor-pointer"
                onClick={() => scrollByCards("left")}
            >
                <div className="text-white text-xl">‹</div>
            </div>

            {/* Right Area */}
            <div
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-100 z-10 hidden group-hover:flex items-center justify-center
             rounded-lg bg-white/10 backdrop-blur-lg to-transparent shadow-lg
             transition hover:scale-105 cursor-pointer"
                onClick={() => scrollByCards("right")}
            >
                <div className="text-white text-xl">›</div>
            </div>

            {/* Card List */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scroll-smooth space-x-4 no-scrollbar px-4 py-6"
            >
                {mockData.map((item, index) => (
                    <div
                        key={item.title}
                        className="collection-card relative w-1/4 aspect-square rounded-xl shadow-md overflow-hidden flex-shrink-0"
                    >
                        {/* 배경 이미지 */}
                        <img
                            ref={index === 0 ? firstImgRef : null}
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            crossOrigin="anonymous"
                        />

                        {/* 하단 그라데이션 + 텍스트 */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="flex items-center gap-1 text-white text-sm font-semibold">
                                <span className="truncate max-w-[160px]">{item.title}</span>
                                {item.isVerified && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-blue-400 shrink-0"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="text-xs text-white/70">Floor: {item.floorPrice}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
