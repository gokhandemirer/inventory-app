/** @type {import("prettier").Config} */
const config = {
	jsxSingleQuote: true,
	singleQuote: true,
	tabWidth: 4,
	useTabs: true,
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;