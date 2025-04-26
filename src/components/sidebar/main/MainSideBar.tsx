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
    const [servers] = useState([
        { id: "1", name: "고승범", imageUrl: profile },
        { id: "2", name: "고승범2", imageUrl: "" },
    ]);

    return (
        <div
            className="flex flex-col items-center
      h-full w-full text-white bg-[rgb(18,18,20)] py-2 space-y-3"
        >
            <NavigationMessage />

            <div className="h-[1px] bg-zinc-700 rounded-md w-10" />

            <ScrollArea className="flex-1 w-full">
                <div className="flex flex-col items-center space-y-4">
                    {servers.map((server) => (
                        <NavigationItem
                            key={server.id}
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    ))}
                    <NavigationAction />
                    <NavigationThreads />
                    <NavigationExplorer />
                </div>
            </ScrollArea>
        </div>
    );
};

