import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'https://wyh68l.cn';
App.mpType = 'app'


const app = new Vue({
  ...App
})
app.$mount()
