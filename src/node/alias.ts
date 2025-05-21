import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 此项目包路径
export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../../..')

export const CLIENT_RUNTIME_PATH = resolve(PKG_ROOT, 'src/runtime')

export const CLIENT_ENTRY_PATH = resolve(CLIENT_RUNTIME_PATH, 'client-entry.ts')
