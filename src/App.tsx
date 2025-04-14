import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AppRouter} from "@/routes/AppRouter.tsx";
export const App = () =>{
    return (
            <Router>
                {/* 라우트 설정 */}
                <Routes>
                    {AppRouter.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Router>
    );
}