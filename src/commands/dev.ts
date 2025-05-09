import { blue, green } from 'kleur/colors'
import { createServer, searchForWorkspaceRoot } from 'vite'
import * as process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { devPagePlugin } from '@/node/plugins/dev.page.ts'
import { DIST_CLIENT_PATH } from '@/node/alias.ts'
import { resolveConfig } from '@/node/config.ts'

export const devCommand = async (options: { port: number }) => {
	console.log(blue('启动开发服务器...'))

	const config = resolveConfig()
	const server = await createServer({
		root: config.root,

		server: {
			port: options.port,
			open: true,
			host: '0.0.0.0',
			fs: {
				strict: false,
				allow: [
					searchForWorkspaceRoot(process.cwd()),
					DIST_CLIENT_PATH
				]
			}
		},
		plugins: [
			vue(),
			devPagePlugin()
		]
	})

	await server.listen()
	server.printUrls()
	server.bindCLIShortcuts({ print: true })
	console.log(green('开发服务器启动成功！'))
}
