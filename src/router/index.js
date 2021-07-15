import Vue from 'vue'
import VueRouter from 'vue-router'
import { Switch } from '_vant@2.12.23@vant'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      index: '/',
    }
  },

  // 登陆 注册
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login/Login'),
    meta: {
      title: '登陆',
      index: '/Login',

    }
  },
  // 切换地址

  {
    path: '/SwithAdderss',
    name: 'SwithAdderss',
    component: () => import('../views/swithAdderss/SwithAdderss'),
    meta: {
      title: '城市列表',
      index: '/SwithAdderss',

    }
  },
  // details 详情
  {
    path: '/Details',
    name: 'Details',
    component: () => import('../views/details/Details'),
    meta: {
      title: '详情',
      index: '/Details'
    }
  },
  //购物车
  {
    path: '/CarViews',
    name: 'CarViews',
    component: () => import('../views/carViews/CarViews'),
    meta: {
      title: '购物车',
      index: '/CarViews'
    }
  },
  // 我的
  {
    path: '/My',
    name: 'My',
    component: () => import('../views/my/My'),
    meta: {
      title: '我的',
      index: '/My',

    }
  },
  // 分类
  {
    path: '/Classification',
    name: 'Classification',
    component: () => import('../views/classification/Classification'),
    meta: {
      title: '分类',
      index: '/Classification'

    }
  },
  // 个人资料
  {
    path: '/Personal',
    name: 'Personal',
    component: () => import('../views/my/Personal'),
    meta: {
      title: '个人资料',
      index: '/Personal'

    }
  },
  // 订单支付
  {
    path: '/ToOrder',
    name: 'ToOrder',
    component: () => import('../views/order/ToOrder'),
    meta: {
      title: '订单支付',
      index: '/ToOrder'

    }
  },
  // 浏览记录
  {
    path: '/History',
    name: 'History',
    component: () => import('../views/my/History'),
    meta: {
      title: '浏览记录',
      index: '/History'
    }
  },
  // 最近收藏
  {
    path: '/Collection',
    name: 'Collection',
    component: () => import('../views/my/Collection'),
    meta: {
      title: '最近收藏',
      index: '/Collection'
    }
  },
  // 全部订单
  {
    path: '/AllOrder',
    name: 'AllOrder',
    component: () => import('../views/order/AllOrder'),
    meta: {
      title: '全部订单',
      index: '/AllOrder'
    }
  },
  // 评价中心
  {
    path: '/Comment',
    name: 'Comment',
    component: () => import('../views/my/Comment'),
    meta: {
      title: '评价中心',
      index: '/Comment'
    }
  },
  // 地址列表
  {
    path: '/AddressView',
    name: 'AddressView',
    component: () => import('../views/my/AddressView'),
    meta: {
      title: '地址列表',
      index: '/AddressView'
    }
  },
  // 地址编辑
  {
    path: '/EditAddress',
    name: 'EditAddress',
    component: () => import('../views/address/EditAddress'),
    meta: {
      title: '添加地址',
      index: '/EditAddress'
    }
  },
  // 发表评论
  {
    path: '/PublishComment',
    name: 'PublishComment',
    component: () => import('../views/my/PublishComment.vue'),
    meta: {
      title: '发表评论',
      index: '/PublishComment'
    }
  },
  // 查看评论
  {
    path: '/ViewComment',
    name: 'ViewComment',
    component: () => import('../views/my/ViewComment.vue'),
    meta: {
      title: '查看评论',
      index: '/ViewComment'
    }
  },
  // 测试
  {
    path: '/text',
    name: 'text',
    component: () => import('../views/text'),
    meta: {
      title: '测试',
      index: '/text'
    }
  },
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('../views/404'),
    meta: {
      title: '网址错误',
      index: '/404'
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  //  有些页面必须登陆才能访问 防止用户直接在地址栏输入地址可以访问
  // console.log(to.path);
  switch (to.path) {
    case '/History':
    case '/AddressView':
    case '/Collection':
    case '/AllOrder':
    case '/Comment':
    case '/ToOrder':
    case '/Personal':
    case '/ViewComment':
    case '/PublishComment':
    case '/EditAddress':
    case '/ViewComment':
      JSON.parse(localStorage.getItem('userInfo')) ? next() : next('/')
      break;
    default:
      next()
      break;
  }
  // next()
})

export default router

