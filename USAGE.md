# Doblar CLI 使用指南

## 快速开始

### 安装依赖

```bash
git clone git@github.com:doblar/doblar.git

# 进入项目目录
cd doblar

# 安装依赖
npm install

# 链接到全局（开发模式）
npm link
```

### 使用示例

```bash
# 创建应用（打印欢迎信息）
doblar create

# 启动开发服务器
doblar dev

# 指定端口启动开发服务器
doblar dev --port 8080

# 构建应用
doblar build

# 指定输出目录构建应用
doblar build --outDir dist-prod
```

## OpenAPI 文件

项目中已包含一个示例 OpenAPI 文件 `example-openapi.json`，您可以将其复制到项目根目录并重命名为 `openapi.json` 来测试：

```bash
cp example-openapi.json openapi.json
```

启动开发服务器后，Doblar 将自动解析 OpenAPI 文件中的路由信息，并生成对应的页面。

## 开发流程

1. 在项目根目录放置 `openapi.json` 文件
2. 运行 `doblar dev` 启动开发服务器
3. 访问开发服务器地址查看生成的应用
4. 修改 OpenAPI 文件后重启服务器以更新路由
5. 完成开发后使用 `doblar build` 构建应用

## 注意事项

- 开发服务器会在项目目录下创建临时文件夹 `.doblar-temp`，用于存放生成的 Vue 应用文件
- 构建后的文件默认输出到 `dist` 目录
- 如果没有提供 `openapi.json` 文件，CLI 会自动创建一个示例文件