import vuePlugin from '@vitejs/plugin-vue'
import type { IConfig } from '@/types/config'
import { renderHtmlPlugin } from '@/node/plugins/renderHtmlPlugin.ts'
import { pluginConfig } from '@/node/plugins/config.ts'
import tailwindcss from '@tailwindcss/vite'
import { routerPlugin } from '@/node/plugins/routerPlugin.ts'
import { openApiPlugin } from '@/node/plugins/openApiPlugin.ts'

export const vitePlugin = (config: IConfig) => {
    return [
        tailwindcss(),
        pluginConfig(config),
        renderHtmlPlugin(),
        vuePlugin(),
        routerPlugin(config),
        openApiPlugin(config)
    ]
}
