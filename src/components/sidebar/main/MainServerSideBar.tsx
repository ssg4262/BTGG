"use client";
import {UserInfo} from "@/components/user/UserInfo.tsx";

export const MainServerSideBar = () => {
    return (
        <div className="w-60 h-screen rounded-tl-2xl bg-[rgb(43,45,49)] text-white flex flex-col">
            <div className="h-[70px] bg-[rgb(99,99,99)] shadow-ml rounded-tl-2xl"></div>
            {/*user info*/}
                <UserInfo/>
            {/*user info*/}

        </div>
    )
}