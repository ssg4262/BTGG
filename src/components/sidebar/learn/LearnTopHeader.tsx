const navItems = ["NFT", "Web3", "Blockchain", "All Articles"];

export const LearnTopHeader = () => {
    return (
        <header className="w-full">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left - Logo + Text */}
                <div className="flex items-center gap-2">
                    <img
                        src="/logo.svg" // 원하는 로고 이미지 경로
                        alt="Logo"
                        className="w-8 h-8"
                    />
                    <span className="text-lg font-semibold text-gray-900">Learn</span>
                </div>

                {/* Center - Nav Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm font-medium text-gray-800 hover:text-blue-600 transition"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Right - Button */}
                <a
                    href="https://opensea.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                >
                    OpenSea
                    <span className="text-xs">↗</span>
                </a>
            </div>
        </header>
    );
};


