import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局子组件
import FootNav from './components/footnav/FootNav'

import Vant from 'vant';
import 'vant/lib/index.css';

import api from './http/api';
import publicJs from './publicJs/com';
import utils from './utils';

import { Notify } from 'vant';

import { IndexBar, IndexAnchor } from "vant";
import { Checkbox, CheckboxGroup } from 'vant';

import { Overlay } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import loading from './components/loading.vue'
Vue.use(Overlay);


// 懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/images/order.gif'),
  loading: require('./assets/images/imgLoading.gif'),
  attempt: 2,
})

Vue.use(Notify);

// 把api挂载成全局变量
Vue.prototype.$Toast = Toast
Vue.prototype.$api = api
Vue.prototype.$Dialog = Dialog
Vue.prototype.$Toast = Toast
Vue.prototype.$publicJs = publicJs
Vue.prototype.$utils = utils


// 注册全局组件
Vue.component('FootNav', FootNav)
Vue.component('loading', loading)
// \注册地址
Vue.use(IndexBar);
Vue.use(IndexAnchor);

Vue.use(Vant);

Vue.use(Dialog);

Vue.config.productionTip = false

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
