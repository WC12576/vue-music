import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 每次修改在控制台打印日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 是否开启调试模式,建议生产环境关闭

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
