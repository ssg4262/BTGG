import { ReactNode } from "react";
import {UserStatusBar} from "@/components/user/UserStatusBar.tsx";

interface LayoutProps {
    sidebar: ReactNode;
    childSide?: ReactNode;
    main?: ReactNode;
}

export const DefaultLayout = ({ sidebar, childSide, main }: LayoutProps) => {
    return (
        <div className="flex h-screen overflow-hidden bg-[rgb(25,25,28)]">
            {/* 사이드바 */}
            <aside className="hidden md:flex w-[72px] flex-col">
                {sidebar}
            </aside>

            {/* 자식 사이드바 (선택적) */}
            <aside className="hidden md:flex w-[260px] flex-col bg-[rgb(18,18,20)]">
                {childSide}
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-grow overflow-y-auto">
                {main}
            </main>

            {/* 유저 상태 바 */}
            <div className="hidden md:block absolute bottom-6 left-2 z-20">
                <UserStatusBar />
            </div>
        </div>
    );
}
