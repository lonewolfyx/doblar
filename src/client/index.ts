import { createApp as createClientApp, defineComponent, h } from 'vue'
import { RouterView } from 'vue-router'
import router from '@/client/router.ts'

export const createApp = () => {
	const app = createClientApp(
		defineComponent({
			name: 'App',
			setup: () => {
				return () => h(RouterView)
			}
		})
	)

	app.use(router)
	app.mount('#app')
}

createApp()
