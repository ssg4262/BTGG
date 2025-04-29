// hooks/useDominantColor.ts
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export function useDominantColor(imageUrl: string) {
    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        img.onload = () => {
            fac.getColorAsync(img)
                .then(color => {
                    setColor(color.rgb); // e.g., "rgb(100, 150, 200)"
                })
                .catch(console.error);
        };
    }, [imageUrl]);

    return color;
}
