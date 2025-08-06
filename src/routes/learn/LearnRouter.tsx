import {RouteObject} from "react-router-dom";
import {LearnNFT} from "@/pages/learn/LearnNFT.tsx";

export const LearnRouter : RouteObject[]  = [
    { path: "/BTGG/learn", element: <LearnNFT /> },
]