
import { defineConfig } from 'vite'

export default defineConfig({
    // IMPORTANT: Replace 'Portfolio_Bernadaus_Prime' with your EXACT GitHub repository name
    // If you are deploying to https://<USERNAME>.github.io/, change this to '/'
    base: '/Portfolio_Bernadaus/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    }
})
