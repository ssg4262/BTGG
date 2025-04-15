"use client";
import {UserInfo} from "@/components/user/UserInfo.tsx";
import {SearchBar} from "@/components/ui/SearchBar.tsx";

export const MainServerSideBar = () => {
    return (
        <div className="w-60 h-screen rounded-tl-2xl bg-[rgb(43,45,49)] text-white flex flex-col">
            {/*user info*/}
                <UserInfo/>
            {/*user info*/}
            <div className="m-2">
            <SearchBar/>
            </div>
        </div>
    )
}