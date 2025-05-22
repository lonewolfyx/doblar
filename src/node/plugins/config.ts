import type { IConfig } from '@/types/config'
import { type Plugin, searchForWorkspaceRoot } from 'vite'
import { CLIENT_RUNTIME_PATH, PKG_ROOT } from '@/node/alias.ts'

export const pluginConfig = (config: IConfig): Plugin => {
    // console.log(config)
    return {
        name: 'doblar-config',
        enforce: 'pre',
        async resolveId(id) {
            return id === 'doblar-config' ? id : null
        },
        config() {
            return {
                root: PKG_ROOT,
                optimizeDeps: {
                    // force include vue to avoid duplicated copies when linked + optimized
                    include: [
                        'vue',
                        'vue-router'
                    ]
                },
                server: {
                    fs: {
                        strict: false,
                        allow: [
                            CLIENT_RUNTIME_PATH,
                            PKG_ROOT,
                            searchForWorkspaceRoot(config.root)
                        ]
                    }
                }
            }
        }
    }
}
