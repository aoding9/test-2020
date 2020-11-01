import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// 将普通的导入方式改造为路由懒加载(也就是按需加载的意思)
// webpackChunkName分组相同的将打包成一个模块，加载时一起加载
const Login = () => import(/* webpackChunkName:"Login_Home_Welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"Login_Home_Welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"Login_Home_Welcome" */ '../components/Welcome.vue')

// import Users from '../components/user/Users.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
const Users = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/power/Roles.vue')

// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
const Cate = () => import(/* webpackChunkName:"Cate_Params" */ '../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName:"Cate_Params" */ '../components/goods/Params.vue')

// import GoodsList from '../components/goods/List.vue'
// import AddGoods from '../components/goods/Add.vue'
const GoodsList = () => import(/* webpackChunkName:"GoodsList_AddGoods" */ '../components/goods/List.vue')
const AddGoods = () => import(/* webpackChunkName:"GoodsList_AddGoods" */ '../components/goods/Add.vue')

// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'
const Order = () => import(/* webpackChunkName:"Order_Report" */ '../components/order/Order.vue')
const Report = () => import(/* webpackChunkName:"Order_Report" */ '../components/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/reports',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: AddGoods },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to 将要访问的路径
// from 从哪个路径跳转而来
// next 是一个函数，表示放行
router.beforeEach((to, from, next) => {
  // 访问登录页直接放行
  if (to.path === '/login') return next()
  // 访问其他页，判断token是否存在
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果不存在，强制跳转到/login
  if (!tokenStr) return next('/login')
  // 如果存在，放行
  next()
})

export default router
