"use client";
import {UserInfo} from "@/components/user/UserInfo.tsx";
import {SearchBar} from "@/components/ui/SearchBar.tsx";
import {Tabs} from "@/components/ui/Tabs.tsx";

const tabItems = [
    { id: "people", label: "친구" },
    { id: "latest", label: "즐겨찾기" },
];
export const MainServerSideBar = () => {
    return (
        <div className="w-60 h-screen rounded-tl-2xl bg-[rgb(43,45,49)] text-white flex flex-col">
            {/*user info*/}
                <UserInfo/>
            {/*user info*/}
            <div className="m-2 mb-1">
            <SearchBar/>
            </div>
            <Tabs tabs={tabItems}/>
        </div>
    )
}