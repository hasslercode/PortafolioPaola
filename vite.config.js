import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.VERCEL ? '/' : '/PortafolioPaola/';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-lcp-preload',
      transformIndexHtml(html, ctx) {
        const jsBundle = Object.keys(ctx.bundle || {}).find((file) => file.startsWith('assets/index-') && file.endsWith('.js'));
        const cssBundle = Object.keys(ctx.bundle || {}).find((file) => file.startsWith('assets/index-') && file.endsWith('.css'));
        let output = html.replace(
          '<!-- lcp-preload -->',
          `<link rel="preload" as="image" href="${base}assets/fotopaola-480.webp" type="image/webp" fetchpriority="high" imagesrcset="${base}assets/fotopaola-480.webp 480w, ${base}assets/fotopaola-720.webp 720w" imagesizes="(max-width: 768px) 50vw, 33vw" />`
        );
        if (jsBundle) {
          output = output.replace(
            '</head>',
            `<link rel="modulepreload" href="${base}${jsBundle}" crossorigin />\n</head>`
          );
        }
        if (cssBundle) {
          output = output.replace(
            '</head>',
            `<link rel="preload" href="${base}${cssBundle}" as="style" />\n</head>`
          );
        }
        return output;
      },
      enforce: 'post',
      apply: 'build',
    },
  ],
  base,
  assetsInclude: ['**/*.pdf'],
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          modals: ['./src/components/Modals.jsx'],
        },
      },
    },
  },
});
