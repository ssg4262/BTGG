// DefaultLayout.tsx
import { ReactNode } from "react";

type DefaultLayoutProps = {
    topnav: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
    headerHeightPx?: number;
    maxMainWidthPx?: number;
};

export const DefaultLayout = ({
                                  topnav,
                                  main,
                                  footer,
                                  headerHeightPx = 56,
                                  maxMainWidthPx = 1200,
                              }: DefaultLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-white overflow-x-hidden">
            {/* Top Navigation */}
            <header style={{ height: headerHeightPx }}>{topnav}</header>

            {/* Main Content */}
            <main className="flex-1 px-4 sm:px-5 lg:px-6 pt-4 w-full">
                <div
                    className="mx-auto w-full"
                    style={{ maxWidth: `${maxMainWidthPx}px` }}
                >
                    {main}
                </div>
            </main>

            {/* Footer */}
            {footer && <footer>{footer}</footer>}
        </div>
    );
};
