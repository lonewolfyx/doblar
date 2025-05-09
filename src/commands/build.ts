import { blue, green } from 'kleur/colors'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import { APP_PATH } from '@/node/alias.ts'
import { buildPagePlugin } from '@/node/plugins/build.page.ts'
import { resolveConfig } from '@/node/config.ts'

export const buildCommand = async (options: { outDir: string }) => {
	console.log(blue('正在构建应用...'))

	const config = resolveConfig()

	await build({
		configFile: false,
		root: config.root,
		build: {
			emptyOutDir: true,
			outDir: resolve(config.root, options.outDir),
			minify: true,
			cssCodeSplit: false,
			rollupOptions: {
				input: {
					app: resolve(APP_PATH, 'index.js')
				},
				preserveEntrySignatures: 'allow-extension',
				output: {
					manualChunks: (id) => {
						if (id.includes('node_modules')) {
							const chunk: string = (id.split('node_modules/')[1] || '').replace('@', '')
							return chunk.split('/')[0]
						}
					},
					entryFileNames: 'assets/js/[name].[hash].js',
					chunkFileNames: 'assets/js/[name].[hash].js',
					assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
				}
			}
		},
		plugins: [
			vue(),
			buildPagePlugin()
		]
	})

	console.log(green('应用构建成功！'))
}
