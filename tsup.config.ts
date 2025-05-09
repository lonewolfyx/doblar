import { defineConfig } from 'tsup'
import vuePlugin from 'esbuild-plugin-vue'

export default defineConfig({
    entry: ['src/node/cli.ts', 'src/client/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: false,
    splitting: false,
    esbuildPlugins: [
        vuePlugin()
    ],
    // loader: {
    //     '.vue': 'ts',     // 让 esbuild 把 .vue 当成 ts/tsx 处理
    //     // 如有其它静态资源也可按需补充：
    //     // '.png': 'file',
    //     // '.svg': 'file'
    // },
    define: {
        // 注意值要是字符串
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
    },
    // 可选：把所有 .html 文件都排除在打包之外
    external: ['**/*.html']

})
