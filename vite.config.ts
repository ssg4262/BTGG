import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
          react(),
          tailwindcss(),
    ],
    base:'/BTGG/',
    server: {
        proxy: {
            "/cg": {
                target: "https://api.coingecko.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cg/, ""), // '/cg' 접두사 제거
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
