import type { Plugin } from 'vite'
import { renderTemplatePage } from '@/node/render.template.ts'

export function buildPagePlugin(): Plugin {
	const HTML_ENTRY_ID = 'index.html'
	const ROUTES_ID = 'virtual:dev-page'

	return {
		name: 'vite-plugin-build-render-page',

		// 让 build 阶段把 index.html 当成入口
		config() {
			return {
				build: {
					rollupOptions: {
						input: HTML_ENTRY_ID
					}
				}
			}
		},

		// 拦截 “index.html” 和 “virtual:doblar-routes”
		resolveId(id) {
			if (id === HTML_ENTRY_ID) return id
			if (id === ROUTES_ID) return id
		},

		// 根据指定的 id 加载对应的内容
		load(id) {
			if (id === HTML_ENTRY_ID) {
				return renderTemplatePage()
			}
		},

		// 触发 Vite 的 “HTML 入口” 处理，
		// 它会把 <script src="…">、<link>、预加载、注入 <script type=importmap> 等都做完
		transformIndexHtml: {
			order: 'post',
			handler(html) {
				return html
			}
		}
	}
}
