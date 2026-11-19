import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: './',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        {
          name: 'protect-personnel-workbook',
          configureServer(server) {
            server.middlewares.use((request, response, next) => {
              const pathname = request.url?.split('?')[0];
              if (pathname === '/LISTA_PESSOAS.xlsx') {
                response.statusCode = 404;
                response.end('Not found');
                return;
              }
              next();
            });
          },
        },
        react(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
