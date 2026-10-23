import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(), tailwindcss(), VitePWA({ registerType: 'prompt', includeAssets: ['offline.html'], manifest: { name: 'ImpaExplore', short_name: 'ImpaExplore', description: 'Discover places and meet local guides in Impasugong, Bukidnon.', start_url: '/', scope: '/', display: 'standalone', theme_color: '#1B5E20', background_color: '#F4F1EB', icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }] }, workbox: { navigateFallback: '/index.html', runtimeCaching: [] } })] });
