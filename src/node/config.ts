import process from 'node:process'
import { resolve } from 'node:path'
import type { IConfig } from '@/types/config'

export const resolveConfig = (): IConfig => {
    const root: string = process.cwd()

    const cacheDir = resolve(root, 'cache')

    return {
        root,
        outDir: resolve(root, 'dist'),
        cacheDir: cacheDir
    }
}
