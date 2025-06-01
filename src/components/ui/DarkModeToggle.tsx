import { useState } from "react";
import { Check, X, Minus } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode"; // 기존 훅 사용

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useDarkMode();
    const [icon, setIcon] = useState<"check" | "x" | "minus">(isDark ? "x" : "check");

    const handleToggle = () => {
        setIcon("minus");

        setTimeout(() => {
            const newDark = !isDark;
            setIsDark(newDark);
            setIcon(newDark ? "x" : "check");
        }, 200); // icon animation duration
    };

    const renderIcon = () => {
        switch (icon) {
            case "check":
                return <Check size={15} className="transition-opacity duration-200 opacity-100" />;
            case "x":
                return <X size={15} className="transition-opacity duration-200 opacity-100" />;
            case "minus":
                return <Minus size={15} className="transition-opacity duration-200 opacity-100" />;
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="w-15 h-8 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-500"
        >
      <span
          className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white text-gray-700 dark:text-white 
          flex items-center justify-center
          transform transition-transform duration-300
          ${isDark ? "translate-x-7" : ""}
        `}
      >
        {renderIcon()}
      </span>
        </button>
    );
};
