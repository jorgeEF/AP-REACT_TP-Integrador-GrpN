import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://jorgeEF.github.io/DEPLOY_AP-React_TP-Integrador_Grupo-N'
})
