import './style.css' // 必须放在最上面

import { createApp as createClientApp } from 'vue'
import App from './App.vue'

const renderInBrowser = () => {
    const app = createClientApp(App)

    app.mount('#app')
}

renderInBrowser()
