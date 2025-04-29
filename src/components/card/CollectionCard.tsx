// components/CollectionCard.tsx
type CollectionCardProps = {
    title: string;
    floor: string;
    imageUrl: string;
};

export const CollectionCard = ({ title, floor, imageUrl }: CollectionCardProps) => {
    return (
        <div className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm hover:scale-[1.02] transition cursor-pointer">
            <img src={imageUrl} alt={title} className="w-full h-60 object-cover" />
            <div className="p-4 text-white">
                <h3 className="font-semibold text-md">
                    {title} <span className="text-sky-400">✔️</span>
                </h3>
                <p className="text-sm text-white/70">Floor: {floor}</p>
            </div>
        </div>
    );
};
