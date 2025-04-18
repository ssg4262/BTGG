import mainLogo from '@/assets/img/logo/MainLogo.png'
export const MainLanding = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* 배경 효과 (픽셀 및 별) */}
            <div className="absolute inset-0 bg-[url('/bg-stars.png')] bg-cover opacity-20 pointer-events-none" />

            {/* Discord 로고 */}
            <div className="z-10 flex flex-col items-center text-center px-6">
                <img
                    src={mainLogo}
                    alt="Discord Logo"
                    className="w-40 h-40 mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">
                    <span className="text-white">OXOG 에 오신 걸 환영</span>
                    <span className="text-white">합니다</span>
                </h1>
                <p className="text-sm text-gray-300">
                    어울리고, 게임하고, 가볍게 대화하세요. 아래를 탭해 시작해요!
                </p>

                <div className="mt-8 w-full max-w-xs space-y-3">
                    <button className="w-full bg-white text-[#404EED] font-semibold py-3 rounded-full">
                        가입하기
                    </button>
                    <button className="w-full bg-[#404EED] text-white font-semibold py-3 rounded-full">
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
};