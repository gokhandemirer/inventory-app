import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@api': path.resolve(__dirname, 'src/pages/api'),
			'@db': path.resolve(__dirname, 'src/server/db'),
			'@routers': path.resolve(__dirname, 'src/server/routers'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},

	test: {
		setupFiles: './setupTests.ts',
		environment: 'jsdom',
		globals: true,
		clearMocks: true,
		coverage: {
			reportsDirectory: './coverage',
			reporter: ['text', 'html'],
			include: [
				'src/components/**/*.{js,jsx,ts,tsx}',
				'src/server/api/{routers,schemas}/**/*.{js,jsx,ts,tsx}',
				'src/utils/helpers/**/*.{js,ts}',
			],
			branches: 60,
			functions: 58,
			lines: 75,
			statements: 78,
		},
	},
});
