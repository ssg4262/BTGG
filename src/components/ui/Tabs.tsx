import { useState } from "react";

type Tab = {
    id: number;
    label: string;
};

type TabsProps = {
    tabs: Tab[];
    onTabChange?: (tabId: number) => void;
};

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

    const handleClick = (tabId: number) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className="border-b border-gray-700 flex space-x-6 px-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleClick(tab.id)}
                    className={`py-2 text-sm font-medium cursor-pointer ${
                        activeTab === tab.id
                            ? "text-[rgb(234,234,234)] border-b-2 border-[rgb(234,234,234)]"
                            : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}