import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode;
    children?: ReactNode;
    main?: ReactNode;
}

export const DefaultLayout = ({ sidebar , children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b text-white from-[#0d1117] to-[#1a1f2b] ">
            <aside className="w-50 h-screen from-[#0d1117] to-[#1a1f2b] text-white flex flex-col justify-between">
                {sidebar}
            </aside>
            <main className="pt-20 px-4 md:px-10">
                {children}
            </main>
        </div>
    );
}
