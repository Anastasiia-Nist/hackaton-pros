import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  define: {
    VITE_BASE_URL: process.env.VITE_BASE_URL,
    VITE_USERNAME: process.env.VITE_USERNAME,
    VITE_PASSWORD: process.env.VITE_PASSWORD,
  },
});
