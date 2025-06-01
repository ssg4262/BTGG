import React from "react";

type ArticleCardProps = {
    category: string;
    title: string;
    date: string;
    imageSrc: string;
    imageAlt?: string;
    onShare?: () => void;
    buttonLabel?: string;
    buttonIcon?: React.ReactNode;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
                                                     category,
                                                     title,
                                                     date,
                                                     imageSrc,
                                                     imageAlt = title,
                                                     onShare,
                                                     buttonLabel = "Share",
                                                     buttonIcon = <span className="text-lg">▶</span>,
                                                 }) => {
    return (
        <section className="w-full px-6 py-12  flex justify-center">
            <article className="max-w-4xl w-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">{category}</p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{title}</h1>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    {onShare && (
                        <button
                            onClick={onShare}
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-xl text-sm font-medium shadow"
                            aria-label={buttonLabel}
                        >
                            {buttonIcon}
                            {buttonLabel}
                        </button>
                    )}
                </div>

                {/* Image */}
                <div className="w-full rounded-3xl overflow-hidden shadow-xl">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </article>
        </section>
    );
};

export default ArticleCard;

