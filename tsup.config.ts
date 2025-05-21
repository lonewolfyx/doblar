import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/node/cli.ts'],
    bundle: true,
    splitting: true,
    format: ['esm'],
    outDir: 'dist/node',
    shims: true,
    clean: true,
    skipNodeModulesBundle: true,
    dts: true
})
