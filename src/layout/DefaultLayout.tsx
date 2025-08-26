// DefaultLayout.tsx
type DefaultLayoutProps = {
    topnav: ReactNode;
    rail: ReactNode;
    side: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
    headerHeightPx?: number;
    showSideOnMobileTop?: boolean;
    sideMobileOverride?: Record<string, unknown>;
};
import {cloneElement, isValidElement, ReactElement, ReactNode} from "react";


export const DefaultLayout = ({
                                  topnav, rail, side, main, footer,
                                  headerHeightPx = 56,
                                  showSideOnMobileTop = true,
                                  sideMobileOverride,
                              }: DefaultLayoutProps) => {
    const top = `${headerHeightPx}px`;
    const fillH = `calc(100vh - ${headerHeightPx}px)`;

    const renderSideForMobileTop = () => {
        if (!showSideOnMobileTop) return null;
        if (isValidElement(side)) {
            const mergedProps = { context: "main", ...(sideMobileOverride || {}) };
            return cloneElement(side as ReactElement, mergedProps);
        }
        return side;
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white
                    overflow-x-hidden"> {/* ✅ 가로 스크롤 방지 */}
            {topnav}

            <div className="lg:hidden px-4 pt-4 min-w-0">{/* ✅ 줄어들 수 있게 */}
                {renderSideForMobileTop()}
            </div>

            <div className="grid gap-0 lg:[grid-template-columns:auto_340px_1fr] min-w-0">{/* ✅ */}
                {rail}

                <aside className="hidden lg:block sticky min-w-0" style={{ top, height: fillH }}>
                    {side}
                </aside>

                <main className="px-4 sm:px-5 lg:px-6 pt-4 min-w-0">{/* ✅ 핵심 */}
                    {main}
                </main>
            </div>

            {footer}
        </div>
    );
};
