// src/layout/DefaultLayout.tsx
import { ReactNode } from "react";

type DefaultLayoutProps = {
    topnav: ReactNode;
    sidebar?: ReactNode;
    main: ReactNode;
    right?: ReactNode;
    footer?: ReactNode;
    headerHeightPx?: number;
};

export const DefaultLayout = ({
                                  topnav,
                                  sidebar,
                                  main,
                                  right,
                                  footer,
                                  headerHeightPx = 56,
                              }: DefaultLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-300">
            {/* ✅ 상단 네비게이션 */}
            <header
                className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between
                   border-b border-zinc-200/50 dark:border-white/10
                   bg-white/80 dark:bg-black/70 backdrop-blur-md
                   px-4 sm:px-6 h-[56px]"
                style={{ height: headerHeightPx }}
            >
                {topnav}
            </header>

            {/* ✅ 메인 컨테이너 */}
            <main className="flex-1 w-full pt-[56px]">
                <div
                    className="
            mx-auto
            w-full
            max-w-screen-2xl
            grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8
            px-3 sm:px-5 lg:px-8
            py-5 sm:py-8
          "
                >
                    {/* ✅ Sidebar (데스크탑에서만 표시) */}
                    {sidebar && (
                        <aside
                            className="
                hidden lg:block
                col-span-2
                sticky top-[72px]
                h-[calc(100vh-72px)]
                overflow-y-auto
                scrollbar-thin scrollbar-thumb-zinc-700/20
              "
                        >
                            {sidebar}
                        </aside>
                    )}

                    {/* ✅ Main 영역 */}
                    <section
                        className="
              col-span-12 lg:col-span-7 xl:col-span-8
              min-w-0
              flex flex-col
              gap-6 sm:gap-8
            "
                    >
                        {main}
                    </section>

                    {/* ✅ Right Panel (데스크탑 이상에서만 표시) */}
                    {right && (
                        <aside
                            className="
                hidden xl:block
                col-span-3
                min-w-[280px]
                space-y-5
                sticky top-[72px]
                h-[calc(100vh-72px)]
                overflow-y-auto
                scrollbar-thin scrollbar-thumb-zinc-700/20
              "
                        >
                            {right}
                        </aside>
                    )}
                </div>
            </main>

            {/* ✅ Footer */}
            {footer && (
                <footer className="border-t border-zinc-200/50 dark:border-white/10 bg-white/80 dark:bg-black/70 backdrop-blur-md py-4">
                    <div className="max-w-screen-xl mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        {footer}
                    </div>
                </footer>
            )}
        </div>
    );
};
