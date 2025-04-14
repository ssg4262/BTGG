import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode;
    childSide?: ReactNode;
    main?: ReactNode;
}

export const DefaultLayout = ({ sidebar, childSide, main }: LayoutProps) => {
    return (
        <div className="flex h-screen overflow-hidden bg-[rgb(48,50,56)]">
            {/* 사이드바 */}
            <aside className="hidden md:flex w-[72px] flex-col">
                {sidebar}
            </aside>

            {/* 자식 사이드바 (선택적) */}
            <aside className="hidden md:flex w-[240px] flex-col bg-zinc-800">
                {childSide}
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-grow overflow-y-auto">
                {main}
            </main>
        </div>
    );
}
