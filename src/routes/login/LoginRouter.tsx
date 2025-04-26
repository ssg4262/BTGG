import {RouteObject} from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage.tsx";

export const LoginRouter : RouteObject[]  = [
    { path: "/login", element: <LoginPage /> },
]