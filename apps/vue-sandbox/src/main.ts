import { createApp } from 'vue'
import { defineCustomElements } from '@vgregion/components-core/loader'
import '@vgregion/components-core/dist/styles.css'
import App from './App.vue'

defineCustomElements()
createApp(App).mount('#app')
