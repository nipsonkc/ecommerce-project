import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for React + fast HMR
export default defineConfig({
    plugins: [react()],
    server: { port: 5173 },
    preview: { port: 5173 }
})
