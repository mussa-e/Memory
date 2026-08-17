import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: "/Memory-App/",

    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                settings: resolve(__dirname, 'settings.html'),
                game: resolve(__dirname, 'game.html'),
                endscreenCv: resolve(__dirname, 'endscreen-cv.html'),
                endscreenGt: resolve(__dirname, 'endscreen-gt.html'),
                winCv: resolve(__dirname, 'win-cv.html'),
                winGt: resolve(__dirname, 'win-gt.html')
            }
        }
    }
});


