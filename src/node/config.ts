import process from 'node:process'
import { resolve } from 'node:path'

export const resolveConfig = () => {

    const root: string = process.cwd()

    return {
        root,
        outDir: resolve(root, 'dist')
    }
}
