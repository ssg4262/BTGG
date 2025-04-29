// components/CategoryTabs.tsx
import { useState } from "react";
import clsx from "clsx";

const categories = [
    "All",
    "Art",
    "Gaming",
    "Memberships",
    "PFPs",
    "Photography",
    "Music",
];

export const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <div className="bg-transparent mt-2 px-6">
            <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={clsx(
                            "px-4 py-2 rounded-xl text-md font-semibold whitespace-nowrap transition",
                            activeTab === category
                                ? "bg-white/10 text-white"
                                : "text-white hover:bg-white/5"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
