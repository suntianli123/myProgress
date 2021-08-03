import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex);

export default new Vuex.Store({
    // 相当于组件的data,专门用来存放全局的数据
    state,
    // getters相当于组件中调用vuex的computed，getters是全局的
    getters,
    // mutations相当于组件中的methods,但不能使用异步方法（比如定时器，axios不能用）
    mutations,
    // actions相当于组件中的methods,能使用异步方法，实际修改状态值的还是--mutations
    actions,
    // 模块化，大项目用的吧，管理有多个vuex的
    modules:{},
})