import React from 'react';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1e1f22] to-[#2b2d31]">
                {children}
            </div>
    );
};