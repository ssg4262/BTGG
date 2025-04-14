"use client"
import {useState} from "react";
import {NavigationMessage} from "@/components/navigation/NavigationMessage.tsx";

import profile from '@/assets/img/profile/profile.png'
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {NavigationItem} from "@/components/navigation/NavigationItem.tsx";
import {NavigationAction} from "@/components/navigation/NavigationAction.tsx";
import {NavigationThreads} from "@/components/navigation/NavigationThreads.tsx";
import {NavigationExplorer} from "@/components/navigation/NavigationExplorer.tsx";

export const MainSideBar = () => {
    const [servers] = useState([{
        id:'1' , name:'고승범',imageUrl: profile
    }, {
        id:'2' , name:'고승범2',imageUrl:''
    }
    ]);
    return(
        <div
            className="space-y-4 flex flex-col items-center
            h-full text-white w-full bg-[rgb(29,31,37)]
            py-3"
        >
            <div>
                <NavigationMessage />
            </div>
            <div className = "h-[2px] bg-zinc-700 rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id = {server.id}
                            name = {server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
                {/*서버추가버튼*/}
                <NavigationAction/>
            </ScrollArea>
            <div className="pb-3 mt-auto flex
            items-center flex-col gap-y-4">
                <NavigationThreads/>
                <NavigationExplorer/>
            </div>
        </div>
    )
}

