import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// const require = createRequire(import.meta.url)
const ROOT_PATH = fileURLToPath(import.meta.url)
export const PKG_ROOT = resolve(ROOT_PATH, '../..')

export const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')
export const APP_PATH = resolve(PKG_ROOT, './client')
