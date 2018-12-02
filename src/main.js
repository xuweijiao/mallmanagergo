// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入插件
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
import MyBread from '@/components/cuscom/myBread.vue'

import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false //项目生产环境
// 注册ElementUI 
Vue.use(ElementUI)
Vue.use(MyHttpServer)

// 全局自定义组件
Vue.component(MyBread.name,MyBread)

// 全局过滤器,v是过滤器自定义的参数,不需要传参
Vue.filter('fmtdate',(v)=> {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
