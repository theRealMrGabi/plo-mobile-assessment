/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				plo: {
					'blue-100': '#0B3954',
					'teal-100': '#087E8B',
					'teal-200': '#BFD7EA',
					'teal-300': '#1D4E89',
					'purple-100': '#613BE7',
					'purple-200': '#F0EDFD',
					'purple-300': '#aa96da'
				}
			}
		}
	},
	plugins: []
}
