
import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode;
    topDiv?: ReactNode;
    main?: ReactNode;
    floating?:ReactNode;
}

export const DefaultLayout = ({ sidebar, topDiv ,floating}: LayoutProps) => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-[rgb(17,17,17)]  dark:text-white transition-colors duration-300">
            <div className="flex">
                <aside>
                    {sidebar}
                </aside>
                <main className="flex-1 pt-20 px-4 md:px-10">
                    {topDiv}
                </main>
                <div>
                    {floating}
                </div>
            </div>
        </div>
    );
};

