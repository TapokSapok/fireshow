import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// includePaths: ['./src'],
				additionalData: `@use '@/app/variables' as *;`,
			},
		},
	},
	server: { host: '185.128.104.205', port: 3000 },
});
