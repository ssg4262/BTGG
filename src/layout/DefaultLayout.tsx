import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode;
    childSide?: ReactNode;
    main?: ReactNode;
}

export const DefaultLayout = ({ sidebar }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b text-white from-[#0d1117] to-[#1a1f2b] ">
            {sidebar}
            {/*<main className="pt-20 px-4 md:px-10">{children}</main>*/}
        </div>
    );
}
