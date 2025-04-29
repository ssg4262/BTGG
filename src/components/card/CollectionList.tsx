import { useEffect, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import profile from "@/assets/img/profile/profile.png"
type Props = {
    onFirstImageColorExtract?: (color: string) => void;
};

const mockData = [
    {
        title: "Verdandi Origins",
        imageUrl: profile,
        floorPrice: "1.15 ETH",
    },
    {
        title: "NBA Top Shot",
        imageUrl: "https://yourcdn.com/image2.jpg",
        floorPrice: "1.09 FLOW",
    },
    // ...
];

export const CollectionList = ({ onFirstImageColorExtract }: Props) => {
    const firstImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!firstImgRef.current || !onFirstImageColorExtract) return;

        const fac = new FastAverageColor();
        const img = firstImgRef.current;

        if (img.complete) {
            fac.getColorAsync(img).then(color => {
                onFirstImageColorExtract(color.rgb);
            });
        } else {
            img.onload = () => {
                fac.getColorAsync(img).then(color => {
                    onFirstImageColorExtract(color.rgb);
                });
            };
        }
    }, [onFirstImageColorExtract]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
            {mockData.map((item, index) => (
                <div key={item.title} className="text-white">
                    <img
                        src={item.imageUrl}
                        ref={index === 0 ? firstImgRef : null}
                        className="rounded-lg w-full"
                        crossOrigin="anonymous"
                    />
                    <div className="font-bold mt-2">{item.title}</div>
                    <div className="text-sm">Floor: {item.floorPrice}</div>
                </div>
            ))}
        </div>
    );
};
