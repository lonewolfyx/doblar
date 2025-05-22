import './style.css' // 必须放在最上面
import { createApp as createClientApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import routes from 'virtual:routes'
import { createRouter, createWebHistory } from 'vue-router'

const renderInBrowser = async () => {
    const app = createClientApp(App)

    console.log('注册的路由数据', routes)
    const router = createRouter({
        history: createWebHistory(),
        routes
    })

    app.use(router)

    app.mount('#app')
}

renderInBrowser().then(() => {})
