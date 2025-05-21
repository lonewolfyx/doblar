import { version } from '../../package.json'
import cac from 'cac'
import chalk from 'chalk'

const cli = cac('doblar')

// 版本信息
cli.version(version)
cli.help()

// 创建应用命令
cli.command('create', '创建新应用').action(async () => {
    console.log(chalk.blue('开始创建应用...'))
})

// 开发调试命令
cli.command('dev', '启动开发服务器')
    .option('--port <port>', '指定端口号', { default: 3000 })
    .action(() => {
        console.log('dev')
    })

// 构建打包命令
cli.command('build', '构建应用')
    .option('--outDir <dir>', '输出目录', { default: 'dist' })
    .action(() => {
        console.log('build')
    })

// 解析命令行参数
cli.parse(process.argv)

// 如果没有提供命令，显示帮助信息
if (!process.argv.slice(2).length) {
    cli.outputHelp()
}
