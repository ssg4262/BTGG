import ArticleCard from "@/components/card/ArticleCard.tsx";
import {LearnTopHeader} from "@/components/sidebar/learn/LearnTopHeader.tsx";
import {LearnLayout} from "@/layout/learn/LearnLayout.tsx";
import cardIMGE from '@/assets/img/nft/Doodle.png'


export const LearnNFT = () => {
    return (
        <LearnLayout
            sidebar={<LearnTopHeader/>}
            body={<ArticleCard
                category="NFT"
                title="What is an NFT?"
                date="August 26, 2022"
                imageSrc={cardIMGE}
                onShare={() => alert("Shared!")}
            />}
        />
    );
};
