import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class', // ✅ 꼭 추가해야 함
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				// 커스텀 색상 추가 가능
			},
			animation: {
				'fadeIn': 'fadeIn 0.6s ease-in-out',
				'fadeInUp': 'fadeInUp 0.8s ease-out',
				'slideInLeft': 'slideInLeft 0.7s ease-out',
				'scaleIn': 'scaleIn 0.5s ease-out',
				'bounceIn': 'bounceIn 0.8s ease-out',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				bounceIn: {
					'0%': { opacity: '0', transform: 'scale(0.3)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
					'100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
				},
			},
		},
	},
	plugins: [],
}

export default config