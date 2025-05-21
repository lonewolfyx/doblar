import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/node/cli.ts'],
    bundle: true,
    splitting: true,
    format: ['esm'],
    outDir: 'dist',
    shims: true,
    clean: true,
    dts: true
})
