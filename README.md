# Doblar CLI

一个基于 Vite 和 Vue 的文档创建工具包，可以根据 OpenAPI 规范自动生成路由和页面。

## 功能特点

- **创建应用**：初始化一个新的应用
- **开发模式**：启动开发服务器，支持热更新
- **构建应用**：将应用打包为生产环境代码
- **OpenAPI 集成**：自动从 OpenAPI 规范生成路由和页面

## 安装

```bash
npm install -g doblar
```

## 使用方法

### 创建应用

```bash
doblar create
```

### 开发模式

```bash
doblar dev [--port <端口号>]
```

默认端口为 3000

### 构建应用

```bash
doblar build [--outDir <输出目录>]
```

默认输出目录为 `dist`

## OpenAPI 集成

将 `openapi.json` 文件放在项目根目录，Doblar 会自动解析其中的 `operationId` 作为路由名称，并生成对应的页面。

## 技术栈

- TypeScript
- Vite
- Vue 3
- Vue Router
- TSX
- tsup

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```
