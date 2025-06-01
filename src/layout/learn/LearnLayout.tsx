import { ReactNode } from "react";

interface LayoutProps {
    sidebar: ReactNode; // ✅ 이제는 header 역할
    body?: ReactNode;
}

export const LearnLayout = ({ sidebar, body }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-pink-50 text-black dark:bg-gradient-to-b dark:from-[#0d1117] dark:to-[#1a1f2b] dark:text-white transition-colors duration-300">
            {/* ✅ header 역할 */}
            <header>
                {sidebar}
            </header>

            {/* ✅ body 영역 */}
            <main className="flex">
                <div className="flex-1">
                    {body}
                </div>
            </main>
        </div>
    );
};
