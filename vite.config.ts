import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            {
                find: '@assets',
                replacement: path.resolve(__dirname, 'src/assets'),
            },
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(__dirname, 'src/hooks'),
            },
            {
                find: '@pages',
                replacement: path.resolve(__dirname, 'src/pages'),
            },
            {
                find: '@services',
                replacement: path.resolve(__dirname, 'src/services'),
            },
            {
                find: '@styles',
                replacement: path.resolve(__dirname, 'src/styles'),
            },
            {
                find: '@app-types',
                replacement: path.resolve(__dirname, 'src/types'),
            },
            {
                find: '@utils',
                replacement: path.resolve(__dirname, 'src/utils'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@styles/variables.scss" as *;',
            },
        },
    },
});
