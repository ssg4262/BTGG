import {DefaultLayout} from "@/layout/DefaultLayout.tsx";
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import {PromoCarousel, PromoItem} from "@/components/carousel/PromoCarousel.tsx";
import doodle from "@/assets/img/nft/Doodle.png"


export const MainHome = () => {
    const promoItems: PromoItem[] = [
        {
            title: "Doodles",
            desc: "하한 : 0.97ETH",
            date: "Oct 2021에 생성됨",
            image: doodle,
        },
        {
            title: "Doodles2",
            desc: "하한 : 0.97ETH",
            date: "Oct 2021에 생성됨",
            image: doodle,
        },
        {
            title: "Doodles3",
            desc: "하한 : 0.97ETH",
            date: "Oct 2021에 생성됨",
            image: doodle,
        },
        {
            title: "Doodles4",
            desc: "하한 : 0.97ETH",
            date: "Oct 2021에 생성됨",
            image: doodle,
        },
    ];
    return (
            <DefaultLayout
             sidebar={<MainTopHeader />}
             topDiv={<PromoCarousel items={promoItems} interval={3000} />}
            />
    );
};
