/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				plo: {
					'black-100': '#112022',
					'blue-100': '#2B7FFC',
					'blue-200': '#EAF5FF',
					'purple-100': '#613BE7',
					'purple-200': '#F0EDFD',
					'purple-300': '#aa96da'
				}
			}
		}
	},
	plugins: []
}
