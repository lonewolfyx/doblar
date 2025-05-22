import type { Plugin, ResolvedConfig } from 'vite'
import type { IConfig } from '@/types/config'
import fs from 'fs-extra'
import * as path from 'node:path'

interface IRouter {
    filePath: string
    routePath: string
}

const virtualModuleId = 'virtual:routes'
const resolvedVirtualModuleId: string = '\0' + virtualModuleId

export const routerPlugin = (config: IConfig): Plugin => {
    const rootDir = config.root
    const mdExtensionRE = /\.md$/

    let resolvedRoot: string
    let moduleId: string

    /**
     * 递归获取某个目录下所有的 .md 文件
     * @param {string} dir 当前扫描的目录
     * @param {string} baseDir 基准目录（用于计算相对路径）
     * @returns {Array<{ filePath: string, routePath: string }>}
     */
    function getAllMarkdownFiles(dir: string, baseDir: string = dir): IRouter[] {
        return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                return getAllMarkdownFiles(fullPath, baseDir)
            }

            if (entry.isFile() && mdExtensionRE.test(entry.name)) {
                const relativePath = path.relative(baseDir, fullPath).replace(mdExtensionRE, '').replace(/\\/g, '/')
                return [
                    {
                        filePath: fullPath,
                        routePath: `/${relativePath}`
                    }
                ]
            }

            return []
        })
    }

    return {
        name: 'vite-plugin-router',
        /**
         * Vite 生命周期钩子：在解析配置后调用
         * 用于拿到最终的项目根目录路径
         */
        configResolved(config: ResolvedConfig) {
            resolvedRoot = path.resolve(config.root, rootDir)
        },
        /**
         * Vite 模块解析钩子
         * 当用户 import 'virtual:md-routes' 时，将其解析为真实的虚拟路径
         */
        resolveId(id: string) {
            if (id === virtualModuleId) {
                moduleId = resolvedVirtualModuleId
                return moduleId
            }
        },

        /**
         * 加载虚拟模块，动态生成 Markdown 路由组件代码
         */
        load(id: string) {
            if (id === resolvedVirtualModuleId) {
                const files = getAllMarkdownFiles(resolvedRoot)
                const routes = files.map(({ filePath, routePath }) => {
                    const componentPath = `/@fs/${filePath}`
                    return `{
        path: '${routePath}',
        component: async () => {
          const md = await fetch('${componentPath}').then(r => r.text())
          // const { marked } = await import('marked')
          return {
            name: '${routePath.slice(1).replace(/\//g, '_')}',
            render() {
              return h('div', {
                innerHTML: 'marked(md)',
                class: 'markdown-body'
              })
            }
          }
        }
      }`
                })

                return `export default [\n${routes.join(',\n')}\n]`
            }
        },

        // 在开发服务器启动时添加目录监听，实现新增/删除 Markdown 文件时热更新
        configureServer(server) {
            // 添加项目目录进入 watcher，否则无法监听新增/删除
            server.watcher.add(resolvedRoot)

            const invalidateRoutes = (file: string, action: 'added' | 'removed') => {
                if (!mdExtensionRE.test(file) || !file.startsWith(resolvedRoot)) return

                console.log(`[vite-plugin-router] Markdown file ${action}: ${file}`)
                const mod = server.moduleGraph.getModuleById(moduleId)
                if (mod) {
                    server.moduleGraph.invalidateModule(mod)
                    server.ws.send({
                        type: 'full-reload',
                        path: '*'
                    })
                }
            }

            server.watcher
                .on('add', (file) => invalidateRoutes(file, 'added'))
                .on('unlink', (file) => invalidateRoutes(file, 'removed'))
        }
    }
}
