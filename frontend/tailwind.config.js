/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

	theme: {
		extend: {
			colors: {
				ecomPrimary: "#ff7043",
				ecomAcsend: "#2e66f6",
				ecomBlack: "#263238",
				ecomGrey: "#78889b",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
