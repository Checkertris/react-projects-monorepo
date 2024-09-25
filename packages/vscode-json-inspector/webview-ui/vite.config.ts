import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': '/src',
        },
    },
    build: {
        outDir: 'dist',

        rollupOptions: {
            input: {
                config: fileURLToPath(new URL('./src/config/index.tsx', import.meta.url)),
            },
            output: {
                entryFileNames: `views/[name].js`,
                chunkFileNames: `views/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
})
