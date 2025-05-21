import { resolveConfig } from '@/node/config.ts'
import { createServer } from 'vite'
import { vitePlugin } from '@/node/plugin.ts'

export const devCommand = async () => {
    const config = resolveConfig()
    console.log('devCommand')
    console.log(config)

    const server = await createServer({
        root: config.root,
        base: '/',
        optimizeDeps: {
            force: true
        },
        cacheDir: config.cacheDir,
        server: {
            port: 3000,
            host: '0.0.0.0',
            open: true
        },
        plugins: vitePlugin(config)
    })
    await server.listen()
    server.printUrls()
}
