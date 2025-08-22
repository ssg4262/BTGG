import { DefaultLayout } from "@/layout/DefaultLayout"
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import {MainSideBar} from "@/components/sidebar/main/MainSideBar.tsx";
import {MainSubSideBar} from "@/components/sidebar/main/MainSubSideBar.tsx";
import {MarketChartPanel} from "@/components/chart/MarketChartPanel.tsx";
import {PricePredictionBanner} from "@/components/banners/PricePredictionBanner.tsx";



export const MainHome = () => {
    return (
        <DefaultLayout
            topnav={<MainTopHeader/>}
            rail={<MainSideBar defaultOpen={false} />}
            side={<MainSubSideBar/>}   // 데스크탑용(좌고정)
            main={
                <div className="space-y-6">
                    {/* ✅ 여기 메인 콘텐츠에 차트 패널 삽입 */}
                    <MarketChartPanel />
                    <PricePredictionBanner/>
                    {/* 필요한 다른 패널들 추가 */}
                    {/* <SomeOtherPanel /> */}
                </div>
            }
        />
    )
}
