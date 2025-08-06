import {DefaultLayout} from "@/layout/DefaultLayout.tsx";
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";
import {FloatingButton} from "@/components/ui/button/FloatingButton.tsx";
import {MessageCircle} from "lucide-react";


export const MainHome = () => {

    return (
        <>
            <DefaultLayout
             sidebar={<MainTopHeader />}
             topDiv={
                <>
                </>
             }
             floating={
                <>
                    <FloatingButton
                        icon={MessageCircle}
                        onClick={() => alert("채팅 열기")}
                    />
                </>
             }
            />
            {/*<ChatPopup />*/}
        </>
    );
};
