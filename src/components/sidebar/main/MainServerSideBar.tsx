"use client";
import {SearchBar} from "@/components/ui/SearchBar.tsx";
import {Tabs} from "@/components/ui/Tabs.tsx";
import UserCard from "@/components/user/UserCard.tsx";
import profile from "@/assets/img/profile/profile.png";
import {CompActionTooltip} from "@/components/ui/CompActionToolTip.tsx";
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
        <div className="w-70 h-screen rounded-tl-2xl bg-[rgb(43,45,49)] text-white flex flex-col">
            {/*user info*/}
            <CompActionTooltip
                component={<UserInfo/>}
                side="bottom"
                align="center"
            >
                <div className="m-2 mt-3 mb-1">
                        <UserCard
                            avatarUrl={profile}
                            username="고승범"
                            tag="0000"
                            isOnline={true}
                        />
                </div>
            </CompActionTooltip>
            {/*user info*/}
            <div className="m-2 mb-1">
                <SearchBar/>
            </div>
            <Tabs tabs={tabItems} onTabChange={(val) => handleTabChange(val)}/>
        </div>
    )
}