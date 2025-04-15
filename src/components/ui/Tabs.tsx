import { useState } from "react";

type Tab = {
    id: string;
    label: string;
};

type TabsProps = {
    tabs: Tab[];
    onTabChange?: (tabId: string) => void;
};

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

    const handleClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className="border-b border-gray-700 flex space-x-6 px-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleClick(tab.id)}
                    className={`py-2 text-sm font-medium ${
                        activeTab === tab.id
                            ? "text-indigo-400 border-b-2 border-indigo-400"
                            : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}