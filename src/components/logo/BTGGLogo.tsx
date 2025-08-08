import React from "react";

type Props = {
    color?: string;   // 글자 색
    bgColor?: string; // 배경 색
    height?: number;  // 로고 높이(px)
};

export const BTGGLogo: React.FC<Props> = ({
                                              color = "#FFFFFF",
                                          }) => {

    return (
          <>
            {/* 글자 - BT.GG */}
            <text
                className="font-BlackHanSans"
                x="50%"
                y="50%"
                fill={color}
                fontSize="50"
                fontWeight="bold"
            >
                BT.GG
            </text></>
    );
};
