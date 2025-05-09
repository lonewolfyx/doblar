import { APP_PATH } from '@/node/alias.ts'

export const renderTemplatePage = (): string => {
    return `\
<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>sadasd</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="">
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/@fs/${APP_PATH}/index.js"></script>
      </body>
    </html>`
}
