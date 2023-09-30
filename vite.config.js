import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RickandMorty/', // Update this line to match your repo name
  plugins: [react()],
})
