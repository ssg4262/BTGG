import { DefaultLayout } from "@/layout/DefaultLayout"
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import {MarketChartPanel} from "@/components/chart/MarketChartPanel.tsx";
import {PricePredictionBanner} from "@/components/banners/PricePredictionBanner.tsx";
import {CryptoNewsRail} from "@/components/card/CryptoNewsRail.tsx";



export const MainHome = () => {
    return (
        <DefaultLayout
            topnav={<MainTopHeader/>}
            rail={<></>}
            side={<></>}   // 데스크탑용(좌고정)
            showSideOnMobileTop={false}   // ✅ 모바일에서 side 강제로 숨김
            main={
                <div className="space-y-6">
                    {/* ✅ 여기 메인 콘텐츠에 차트 패널 삽입 */}
                    <CryptoNewsRail/>
                    <MarketChartPanel />
                    <PricePredictionBanner/>
                    {/* 필요한 다른 패널들 추가 */}
                    {/* <SomeOtherPanel /> */}
                </div>
            }
        />
    )
}
