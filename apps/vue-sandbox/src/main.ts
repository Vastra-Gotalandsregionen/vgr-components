import { createApp } from 'vue'
import { defineCustomElements } from '@vgregion/components-core/loader'
import '@vgregion/design-tokens/dist/css/tokens.css'
import App from './App.vue'

defineCustomElements()
createApp(App).mount('#app')
