import type { Plugin, ViteDevServer } from 'vite'
import type { IConfig } from '@/types/config'
import { resolve } from 'node:path'

export const openApiPlugin = (config: IConfig): Plugin => {
    let OPENAPI_PATH: string

    return {
        name: 'vite-plugin-openapi-transform-markdown',
        apply: 'serve', // 开发模式启用
        configResolved() {
            OPENAPI_PATH = resolve(config.root, 'openapi.json')
        },
        configureServer(server: ViteDevServer) {
            // console.log('asasdasd', server, config)

            server.watcher.add(OPENAPI_PATH).on('change', () => {
                console.log('openapi.json changed, 请重新生成最新的文件路由')
                // 触发全页面重新加载，确保文档更新可见
                server.ws.send({
                    type: 'full-reload',
                    path: '*'
                })
            })
        }
    }
}
