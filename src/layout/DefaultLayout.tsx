import {
    ReactNode,
    ReactElement,
    isValidElement,
    cloneElement,
} from "react";

type DefaultLayoutProps = {
    topnav: ReactNode;
    rail: ReactNode;
    side: ReactNode;            // MainSubSideBar 같은 사이드 패널
    main: ReactNode;
    footer?: ReactNode;

    /** TopNav 높이(px). 기본 56 */
    headerHeightPx?: number;

    /** 모바일 상단에 side를 보여줄지 (기본 true) */
    showSideOnMobileTop?: boolean;

    /**
     * 모바일 상단에 렌더할 때 side에 덮어쓸 props.
     * 예: { context: "main", headerHeightPx: 0 }
     */
    sideMobileOverride?: Record<string, unknown>;
};

export const DefaultLayout = ({
                                  topnav,
                                  rail,
                                  side,
                                  main,
                                  footer,
                                  headerHeightPx = 56,
                                  showSideOnMobileTop = true,
                                  sideMobileOverride,
                              }: DefaultLayoutProps) => {
    const top = `${headerHeightPx}px`;
    const fillH = `calc(100vh - ${headerHeightPx}px)`;

    // 모바일 전용으로 side를 한 번 더 렌더 (필요시 prop 덮어쓰기)
    const renderSideForMobileTop = () => {
        if (!showSideOnMobileTop) return null;
        if (isValidElement(side)) {
            // MainSubSideBar가 context 같은 prop을 지원하면 자동 주입
            const mergedProps = { context: "main", ...(sideMobileOverride || {}) };
            return cloneElement(side as ReactElement, mergedProps);
        }
        // ReactElement가 아니면 그대로 출력
        return side;
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0C0F0D] dark:text-white">
            {topnav}

            {/* 모바일: 메인 상단 카드 */}
            <div className="lg:hidden px-4 pt-4">
                {renderSideForMobileTop()}
            </div>

            {/* 데스크탑: 레일 | 사이드 | 메인 */}
            <div className="grid gap-0 lg:[grid-template-columns:auto_340px_1fr]">
                {/* 1) 좌 레일(폭 전환에 따라 옆이 밀림) */}
                {rail}

                {/* 2) 데스크탑 사이드: 헤더 제외 세로 꽉찬 sticky */}
                <aside
                    className="hidden lg:block sticky"
                    style={{ top, height: fillH }}
                >
                    {side}
                </aside>

                {/* 3) 메인 */}
                <main className="px-4 sm:px-5 lg:px-6 pt-4">
                    {main}
                </main>
            </div>

            {footer}
        </div>
    );
};
