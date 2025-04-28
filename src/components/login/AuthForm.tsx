// src/components/VoiceDetails.tsx
import { useState } from "react";
import {TextInput} from "@/components/form/TextInput.tsx";

export const AuthForm = () => {
    const [tab, setTab] = useState<"connection" | "signup">("connection");

    return (
        <div className="w-[400px] rounded-2xl bg-[#1e1f22] p-6 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4">VIBE LINE</h2>

            {/* Tabs */}
            <div className="flex mb-4 text-gray-400 font-semibold">
                <button
                    onClick={() => setTab("connection")}
                    className={`flex-1 border-b-2 pb-2 cursor-pointer ${
                        tab === "connection" ? "text-white border-white-500" : "border-transparent"
                    }`}
                >
                    로그인
                </button>
                <button
                    onClick={() => setTab("signup")}
                    className={`flex-1 border-b-2 pb-2 cursor-pointer  ${
                        tab === "signup" ? "text-white border-white-500" : "border-transparent"
                    }`}
                >
                    회원가입
                </button>
            </div>

            {/* signup Content */}
            {tab === "connection" && (
                <div className="flex flex-col gap-4">

                    {/* Voice Privacy Code */}
                    <div className="bg-[#2b2d31] p-4 rounded-md">
                        <div className="flex flex-col gap-6">
                            {/* 이메일/전화번호 */}
                            <TextInput label="이메일 또는 전화번호" placeholder="example@email.com" />

                            {/* 비밀번호 */}
                            <TextInput label="비밀번호" type="password" placeholder="비밀번호 입력" />

                            {/* 비밀번호 찾기 */}
                            <div className="text-right">
                                <button type="button" className="text-sm text-white hover:underline transition">
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>

                            {/* 로그인 버튼 */}
                            <button
                                type="submit"
                                className="mt-4 bg-[rgb(255,255,255)] text-black hover:bg-[rgb(195,195,195)] cursor-pointer font-bold py-3 rounded-lg transition-all duration-200"
                            >
                                로그인
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">
                        VibeLine은 reCAPTCHA의 보호를 받으며 Google개인정보 처리방침 및 서비스약관이 적용됩니다.
                    </p>
                </div>
            )}

            {/* 밑에 Text */}
            <div className="mt-8 text-center">
                <span className="text-white font-bold text-lg">VIBE LINE</span>
            </div>
        </div>
    );
}
