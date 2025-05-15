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
		},
	},
	plugins: [],
}

export default config