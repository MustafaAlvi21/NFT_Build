import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      port: process.env.PORT || 3000,
    },
  });
};