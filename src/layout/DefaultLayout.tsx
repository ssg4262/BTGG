
import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode;
    topDiv?: ReactNode;
    main?: ReactNode;
}

export const DefaultLayout = ({ sidebar, topDiv }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-[#0d1117] dark:to-[#1a1f2b] dark:text-white transition-colors duration-300">
            <div className="flex">
                <aside>
                    {sidebar}
                </aside>
                <main className="flex-1 pt-20 px-4 md:px-10">
                    {topDiv}
                </main>
            </div>
        </div>
    );
};

