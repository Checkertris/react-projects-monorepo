import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': '/src',
            shared: '/src/../../shared',
        },
    },
    build: {
        outDir: 'dist',

        rollupOptions: {
            input: {
                home: fileURLToPath(new URL('./src/home/index.tsx', import.meta.url)),
            },
            output: {
                entryFileNames: `views/[name].js`,
                chunkFileNames: `views/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
})
