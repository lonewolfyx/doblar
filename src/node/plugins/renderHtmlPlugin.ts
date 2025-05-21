import type { Plugin } from 'vite'
import type { IConfig } from '@/types/config'
import { CLIENT_ENTRY_PATH, PKG_ROOT } from '@/node/alias.ts'
import { cleanUrl } from '@/node/util.ts'
import { resolve } from 'node:path'
import fs from 'fs-extra'

export const renderHtmlPlugin = (config: IConfig): Plugin => {
    console.log(config)
    return {
        name: 'index-html',
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    // {
                    //     tag: 'link',
                    //     attrs: {
                    //         rel: 'icon',
                    //         href: `${config.siteData?.icon}`,
                    //         type: 'image/image/svg+xml'
                    //     },
                    //     injectTo: 'head'
                    // },
                    {
                        tag: 'script',
                        attrs: {
                            type: 'module',
                            src: `/@fs/${CLIENT_ENTRY_PATH}`
                        },
                        injectTo: 'body'
                    }
                ]
            }
        },
        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    const url = req.url && cleanUrl(req.url)
                    if (url?.endsWith('.html')) {
                        console.log(`可以进行重写渲染`)
                        const templatePath = resolve(PKG_ROOT, 'template.html')
                        console.log(templatePath)
                        let html = fs.readFileSync(templatePath, 'utf8').replace('{title}', '这是一个标题')
                        html = await server.transformIndexHtml(url, html, req.originalUrl)
                        console.log(req.url)
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'text/html')
                        res.end(html)
                        return
                    }
                    next()
                })
            }
        }
    }
}
