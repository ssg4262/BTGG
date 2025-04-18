import {mainRouter} from "@/routes/main/MainRouter.tsx";
import {LoginRouter} from "@/routes/login/LoginRouter.tsx";

export const AppRouter = [
    ...mainRouter,
    ...LoginRouter
];