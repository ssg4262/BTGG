import {AuthForm} from "@/components/login/AuthForm.tsx";
import {AuthLayout} from "@/layout/login/AuthLayout.tsx";

export const LoginPage = () => {
    return (
        <AuthLayout>
            <AuthForm />
        </AuthLayout>
    );
};