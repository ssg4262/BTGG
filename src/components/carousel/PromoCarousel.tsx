import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PromoItem {
    title: string;
    desc: string;
    date: string;
    image: string;
}

interface PromoCarouselProps {
    items: PromoItem[];
    interval?: number;
}

export const PromoCarousel = ({ items, interval = 4000 }: PromoCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [groupSize, setGroupSize] = useState(4);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const updateGroupSize = () => {
        const width = window.innerWidth;
        if (width < 640) setGroupSize(1);
        else if (width < 768) setGroupSize(2);
        else if (width < 1024) setGroupSize(3);
        else setGroupSize(4);
    };

    useEffect(() => {
        updateGroupSize();
        window.addEventListener("resize", updateGroupSize);
        return () => window.removeEventListener("resize", updateGroupSize);
    }, []);

    const totalGroups = Math.ceil(items.length / groupSize);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalGroups);
        }, interval);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [groupSize, items.length, interval]);

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalGroups);
    };

    const itemWidthPercent = 100 / groupSize;
    const offsetPercent = (currentIndex * groupSize * itemWidthPercent);

    return (
        <div
            onMouseEnter={() => {
                setIsHovered(true);
                stopAutoSlide();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                startAutoSlide();
            }}
            className="relative w-full overflow-hidden bg-white dark:bg-[#1e1f23] px-4 py-3 rounded-lg border border-gray-200 dark:border-none transition-colors"
        >
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        width: `${(items.length * 100) / groupSize}%`,
                        transform: `translateX(-${offsetPercent}%)`,
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-2"
                            style={{ width: `${itemWidthPercent}%`, flexShrink: 0 }}
                        >
                            <div className="bg-gray-100 dark:bg-[#2a2b30] rounded-lg p-3 flex items-center gap-4 text-gray-900 dark:text-white">
                                <div
                                    className="w-12 h-12 bg-cover bg-center rounded-md flex-shrink-0"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="text-sm overflow-hidden">
                                    <p className="font-semibold truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.desc}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1">{item.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isHovered && (
                <>
                    <button
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200/60 dark:bg-black/40 hover:bg-gray-300 dark:hover:bg-black/60 text-gray-800 dark:text-white rounded-full p-2 z-10 transition"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200/60 dark:bg-black/40 hover:bg-gray-300 dark:hover:bg-black/60 text-gray-800 dark:text-white rounded-full p-2 z-10 transition"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
        </div>
    );
};
