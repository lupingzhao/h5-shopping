import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 共享数据
export default new Vuex.Store({
  state: {
    carNum: localStorage.getItem('carNum'),
    address: null,
    nickname: localStorage.getItem('nickname'),
    // 
  },
  mutations: {
    // 修改购物车数据
    setCarNum(state, data) {
      state.carNum = data
    },
    // 修改用户数据
    setNickname(state, data) {
      state.nickname = data
    }
  },
  actions: {
  },
  modules: {
  }
})
