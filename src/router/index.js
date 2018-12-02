import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/users/users.vue'
import Role from '@/components/rights/roles.vue'
import Right from '@/components/rights/right.vue'
import Goods from '@/components/goods/goods.vue'
import AddGoods from '@/components/goods/addGoods.vue'


import {
  Message
} from 'element-ui'

Vue.use(Router)



const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: User
    }, {
      name: 'roles',
      path: '/roles',
      component: Role
    }, {
      name: 'rights',
      path: '/rights',
      component: Right
    }, {
      name: 'goods',
      path: '/goods',
      component: Goods
      }, {
        // 注意路由写的位置,因为addgoods组件是和goods组件显示的是一个位置,所以和goods的路由配置是并列关系
      name: 'addgoods',
      path: '/addgoods',
      component: AddGoods
    }]
  }]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果要去的是登录,next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录,判断token
    const token = sessionStorage.getItem('token')
    if (!token) {
      // 如果没有token,转到登录
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    // 有token,next()
    next()
  }
})
export default router
