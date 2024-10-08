/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		colors: {
		  primary: '#006400',
		  secondary: '#FFD700',
		  accent: '#FF0000',
		  'primary-light': '#008000',
		  'secondary-light': '#FFED4A',
		},
		fontFamily: {
		  sans: ['Inter', 'sans-serif'],
		  ubuntu: ['Ubuntu', 'sans-serif'],
		},
	  },
	},
	plugins: [],
  }