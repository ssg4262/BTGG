import {RouteObject} from "react-router-dom";
import {MainLanding} from "@/pages/main/MainLanding.tsx";

export const LoginRouter : RouteObject[]  = [
    { path: "/login", element: <MainLanding /> },
]