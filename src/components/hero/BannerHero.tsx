// src/components/BannerHero.tsx
import { ExternalLink, Share2 } from "lucide-react";

export const BannerHero = () => (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500" />
        <div className="absolute right-3 top-3 flex gap-2">
            <button className="size-9 grid place-items-center rounded-lg bg-black/60 border border-white/15">
                <Share2 className="size-4" />
            </button>
            <button className="size-9 grid place-items-center rounded-lg bg-black/60 border border-white/15">
                <ExternalLink className="size-4" />
            </button>
        </div>
        <div className="relative h-full grid place-items-center">
            <div className="px-4 py-2 rounded-lg bg-black/40 text-white font-bold">BANNER AREA</div>
        </div>
    </div>
);
