/// <reference types="vite/client" />

import type { RouteRecordRaw } from 'vue-router'

interface ImportMetaEnv {
    readonly ENABLE_SPA: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.html'
declare module '*.vue'
declare module '*.css'
declare module '*.json'
declare module '*.ts'

declare module 'virtual:routes' {
    export default []
}
