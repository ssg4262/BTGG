import {DefaultLayout} from "@/layout/DefaultLayout.tsx";
import {MainTopHeader} from "@/components/sidebar/main/MainTopHeader.tsx";


export const MainHome = () => {

    return (
            <DefaultLayout
             sidebar={<MainTopHeader />}
             topDiv={
                <>
                </>
            }
            />
    );
};
