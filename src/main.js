import Vue from 'vue'
import App from './App'
import request from '@/utils/request'//引入自己封装的api
Vue.config.productionTip = false
App.mpType = 'app'
const plugin=request({
  baseURL:'https://ugo.botue.com'
})//引用函数并且执行
Vue.use(plugin)//导入插件
const app = new Vue({
  ...App
})
app.$mount()
