// ChatList.tsx
import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    subtitle?: string;
    avatarColor: string;
    official?: boolean;
    avatarUrl?: string;
    online?: boolean;
}

const users: User[] = [
    { id: 1, name: 'Discord', subtitle: '공식 Discord 메시지', avatarColor: 'bg-indigo-500', official: true, avatarUrl: '/avatars/discord.png', online: false },
    { id: 2, name: '양희만', avatarColor: 'bg-gray-500', avatarUrl: '/avatars/user1.png', online: true },
    { id: 3, name: '김영훈', avatarColor: 'bg-orange-400', avatarUrl: '/avatars/user2.png', online: false },
    { id: 4, name: '1__0__1__0', avatarColor: 'bg-pink-400', avatarUrl: '/avatars/user3.png', online: true },
    { id: 5, name: 'oioioq', avatarColor: 'bg-gray-700', avatarUrl: '/avatars/user4.png', online: false },
    { id: 6, name: '이미나', avatarColor: 'bg-yellow-300', avatarUrl: '/avatars/user5.png', online: true },
    { id: 7, name: '조익', avatarColor: 'bg-gray-500', avatarUrl: '/avatars/user6.png', online: true },
    { id: 8, name: '황현준', avatarColor: 'bg-gray-500', avatarUrl: '/avatars/user7.png', online: false },
    { id: 9, name: '유효준', avatarColor: 'bg-red-500', avatarUrl: '/avatars/user8.png', online: true },
    { id: 10, name: '김영훈, 조익', subtitle: '멤버 3명', avatarColor: 'bg-orange-400', avatarUrl: '/avatars/group.png', online: false },
];

export const ChatList: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleSelect = (id: number) => {
        setSelectedUserId(id);
    };

    const handleLeave = (id: number) => {
        console.log(`채팅방 ${id} 나가기`);
        // 나가기 로직 추가 가능
    };

    return (
        <div className="flex flex-col space-y-2 p-2 min-h-screen text-white">
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => handleSelect(user.id)}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer
            ${selectedUserId === user.id ? 'bg-[rgb(29,29,32)]' : 'hover:bg-zinc-800'}`}
                >
                    {/* 왼쪽 : 아바타 + 이름 */}
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <div className={`w-8 h-8 rounded-full overflow-hidden ${user.avatarColor} flex items-center justify-center`}>
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
                                    </svg>
                                )}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#313338] rounded-full
                ${user.online ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-sm">{user.name}</span>
                                {user.official && (
                                    <span className="bg-blue-600 text-[10px] px-1 py-0.5 rounded-sm font-bold">공식</span>
                                )}
                            </div>
                            {user.subtitle && (
                                <span className="text-xs text-gray-400">{user.subtitle}</span>
                            )}
                        </div>
                    </div>

                    {/* 오른쪽 : 선택된 항목만 나가기 버튼 표시 */}
                    {selectedUserId === user.id && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // 채팅방 선택 막기
                                handleLeave(user.id);
                            }}
                            className="p-1 hover:bg-zinc-700 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-5 h-5 text-gray-400 hover:text-white"
                            >

                                <path
                                    d="M4 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />

                                <path
                                    d="M14 5l6 3v8l-6 3V5z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />

                                <circle
                                    cx="8"
                                    cy="10"
                                    r="1.5"
                                    fill="currentColor"
                                />

                                <path
                                    d="M8 11.5v4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M8 15.5l-1.5 2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M8 15.5l1.5 2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M8 12l2-1"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
