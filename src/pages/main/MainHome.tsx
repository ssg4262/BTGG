import {DefaultLayout} from "@/layout/DefaultLayout.tsx";
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import ArticleCard from "@/components/card/ArticleCard.tsx";



export const MainHome = () => {
    return (
            <DefaultLayout
             sidebar={<MainTopHeader/>}
             body={<ArticleCard
                 category="NFT"
                 title="What is an NFT?"
                 date="August 26, 2022"
                 imageSrc="/nft-thumbnail.png"
                 onShare={() => alert("Shared!")}
             />}
            />
    );
};
