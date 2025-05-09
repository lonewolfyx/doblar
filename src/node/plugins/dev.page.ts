import type { Plugin, ViteDevServer } from 'vite'
import { renderTemplatePage } from '@/node/render.template.ts'

const VIRTUAL_MODULE_ID = 'virtual:dev-page'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export const devPagePlugin = (): Plugin => {
    return {
        name: 'vite-plugin-development-render-page',

        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID) {
                return RESOLVED_VIRTUAL_MODULE_ID
            }
        },

        load(id) {
            if (id === RESOLVED_VIRTUAL_MODULE_ID) {
                return ''
            }
        },

        /**
         * 拦截 .html 请求，重新输出 html
         * @param server
         */
        configureServer(server: ViteDevServer) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    const url = req.url && (req.url).replace(/#.*$/s, '').replace(/\?.*$/s, '')

                    if (url?.endsWith('.html')) {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'text/html')

                        let html = renderTemplatePage()

                        html = await server!.transformIndexHtml(url, html, req.originalUrl)
                        res.end(html)
                        return
                    }
                    next()
                })
            }
        }

    }
}
