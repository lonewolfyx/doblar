import vuePlugin from '@vitejs/plugin-vue'
import type { IConfig } from '@/types/config'
import { renderHtmlPlugin } from '@/node/plugins/renderHtmlPlugin.ts'
import { pluginConfig } from '@/node/plugins/config.ts'
import tailwindcss from '@tailwindcss/vite'

export const vitePlugin = (config: IConfig) => {
    console.log(config)
    return [
        tailwindcss(),
        pluginConfig(config),
        renderHtmlPlugin(config),
        vuePlugin()
    ]
}
