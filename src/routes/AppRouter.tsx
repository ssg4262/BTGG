import {MainRouter} from "@/routes/main/MainRouter.tsx";
import {LoginRouter} from "@/routes/login/LoginRouter.tsx";
import {LearnRouter} from "@/routes/learn/LearnRouter.tsx";

export const AppRouter = [
    ...MainRouter,
    ...LoginRouter,
    ...LearnRouter
];