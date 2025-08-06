// components/ui/ChatPopup.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Home, HelpCircle, X } from "lucide-react";
import { useRecoilState } from "recoil";
import { chatPopupState } from "@/recoil/chatAtoms.ts";

export const ChatPopup = () => {
    const [open, setOpen] = useRecoilState(chatPopupState);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-20 right-4 w-80 rounded-xl overflow-hidden shadow-xl z-50 bg-white text-black"
                >
                    {/* Header Gradient */}
                    <div className="bg-gradient-to-br from-blue-100 to-blue-300 px-4 pt-4 pb-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-1">
                                <span className="text-2xl">안녕하세요 👋</span>
                            </div>
                            <button onClick={() => setOpen(false)}>
                                <X className="w-5 h-5 text-gray-500 hover:text-black" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">도움이 필요하신가요?</p>

                        {/* Avatars */}
                        <div className="mt-3 flex -space-x-2">
                            {[1, 2, 3].map((_, i) => (
                                <img
                                    key={i}
                                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=avatar${i}`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full border border-white"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        <div className="bg-gray-100 rounded-lg p-3 text-sm flex items-center justify-between">
                            <div>
                                <p className="font-semibold">질문하기</p>
                                <p className="text-xs text-gray-500">봇과 팀이 도와드릴 수 있습니다</p>
                            </div>
                            <HelpCircle className="w-4 h-4 text-blue-500" />
                        </div>

                        {/* Search */}
                        <div className="bg-gray-100 rounded-lg p-2">
                            <input
                                type="text"
                                placeholder="도움말 검색"
                                className="w-full text-sm px-2 py-1 bg-gray-100 border-none outline-none"
                            />
                        </div>

                        {/* Help list */}
                        <div className="space-y-2 text-sm">
                            {[
                                "How do I create an NFT?",
                                "Why am I seeing a 'Something went wrong' error?",
                                "How do I sell an NFT?",
                                "What is a verified account or badged collection?",
                            ].map((q, i) => (
                                <div
                                    key={i}
                                    className="hover:bg-gray-100 rounded-md px-2 py-2 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{q}</span>
                                        <span className="text-blue-500">&gt;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Tab */}
                    <div className="border-t text-xs flex items-center justify-around py-2 bg-white">
                        <div className="flex flex-col items-center text-blue-600">
                            <Home className="w-4 h-4" />
                            <span>홈</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>메시지</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-500">
                            <HelpCircle className="w-4 h-4" />
                            <span>도움말</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
