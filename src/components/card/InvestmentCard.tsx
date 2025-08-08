const InvestmentCard = ({
                            total = 0,
                            changeAmount = 0,
                            changePercent = 0,
                            time = '오전 12:08 기준',
                            icons = [],
                        }) => {
    const isNegative = changeAmount < 0;
    const formattedTotal = total.toLocaleString('ko-KR') + '원';
    const formattedChange = `${isNegative ? '-' : '+'}${Math.abs(changeAmount).toLocaleString('ko-KR')}원 (${Math.abs(changePercent)}%)`;

    return (
        <div className="w-[180px] rounded-2xl px-4 py-3 bg-white dark:bg-black shadow-md">
            {/* 아이콘들 */}
            <div className="flex space-x-[-10px] mb-2">
                {icons.map((icon, idx) => (
                    <div
                        key={idx}
                        className="w-6 h-6 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center text-white text-xs font-semibold"
                    >
                        {typeof icon === 'string' ? <img src={icon} alt="icon" className="w-full h-full object-cover" /> : icon}
                    </div>
                ))}
            </div>

            {/* 투자 금액 */}
            <div className="text-gray-900 dark:text-white font-bold text-lg">
                내 투자
            </div>
            <div className="text-black dark:text-white font-bold text-xl">
                {formattedTotal}
            </div>
            <div className="text-blue-500 text-sm font-medium">
                {formattedChange}
            </div>

            {/* 시간 */}
            <div className="text-xs text-gray-500 mt-1">
                {time}
            </div>
        </div>
    );
};

export default InvestmentCard;
