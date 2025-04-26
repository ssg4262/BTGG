// src/components/VoiceDetails.tsx
import { useState } from "react";

export const AuthForm = () => {
    const [tab, setTab] = useState<"connection" | "signup">("connection");

    return (
        <div className="w-[400px] rounded-2xl bg-[#1e1f22] p-6 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4">로그인</h2>

            {/* Tabs */}
            <div className="flex mb-4 text-gray-400 font-semibold">
                <button
                    onClick={() => setTab("connection")}
                    className={`flex-1 border-b-2 pb-2 ${
                        tab === "connection" ? "text-white border-indigo-500" : "border-transparent"
                    }`}
                >
                    로그인
                </button>
                <button
                    onClick={() => setTab("signup")}
                    className={`flex-1 border-b-2 pb-2 ${
                        tab === "signup" ? "text-white border-indigo-500" : "border-transparent"
                    }`}
                >
                    회원가입
                </button>
            </div>

            {/* signup Content */}
            {tab === "connection" && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-500 text-black rounded-full px-2 py-1 text-xs font-bold">
                            End-to-end encrypted
                        </div>
                    </div>

                    <p className="text-sm text-gray-300">
                        Only you and your friends on this call can hear you. Nobody else - not even Wumpus - can listen in!
                    </p>

                    {/* Voice Privacy Code */}
                    <div className="bg-[#2b2d31] p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-200 text-sm">Voice Privacy Code</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center font-bold text-lg text-gray-100">
                            {/* 이메일 또는 전화번호 인풋 */}
                            <input
                                type="text"
                                placeholder="이메일 또는 전화번호"
                                className="col-span-3 md:col-span-1 bg-[#2b2d31] text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
                            />

                            {/* 비밀번호 인풋 */}
                            <input
                                type="password"
                                placeholder="비밀번호"
                                className="col-span-3 md:col-span-1 bg-[#2b2d31] text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
                            />
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">
                        A new code is generated when people join or leave this call.
                    </p>
                </div>
            )}

            {/* 밑에 Text */}
            <div className="mt-8 text-center">
                <span className="text-white font-bold text-lg">View the calls privacy codes</span>
            </div>
        </div>
    );
}
