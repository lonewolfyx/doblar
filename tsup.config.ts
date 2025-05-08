import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/client/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: false,
    splitting: false
})
