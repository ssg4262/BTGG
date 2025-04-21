"use client";
import {SearchBar} from "@/components/ui/SearchBar.tsx";
import {Tabs} from "@/components/ui/Tabs.tsx";
import {UserInfo} from "@/components/user/UserInfo.tsx";

const tabItems = [
    { id: 1, label: "친구" },
    { id: 2, label: "즐겨찾기" },
];
const handleTabChange = (val : number) => {
    console.log(val)
}
export const MainServerSideBar = () => {
    return (
        <div className="w-70 h-screen bg-[rgb(10,10,10)] text-white flex flex-col">
            {/*user info*/}
            <UserInfo/>
            {/*user info*/}
            <div className="m-2 mb-1">
                <SearchBar/>
            </div>
            <Tabs tabs={tabItems} onTabChange={(val) => handleTabChange(val)}/>
        </div>
    )
}