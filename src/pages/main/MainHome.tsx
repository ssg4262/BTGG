import { DefaultLayout } from "@/layout/DefaultLayout"
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import {MainSideBar} from "@/components/sidebar/main/MainSideBar.tsx";
import {MainSubSideBar} from "@/components/sidebar/main/MainSubSideBar.tsx";



export const MainHome = () => {
    return (
        <DefaultLayout
            topnav={<MainTopHeader/>}
            rail={<MainSideBar defaultOpen={false} />}
            side={<MainSubSideBar/>}   // 데스크탑용(좌고정)
            main={
                <>
                </>
            }
        />
    )
}
