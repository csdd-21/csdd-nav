import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    req: {
      title: "",
      tags: ["ss"],
      checkTags: ["ss"],
      page: {
        skip: 1,
        limit: 2,
      }
    },
    res: {
      datas: [],
      total: 0,
    }
  },
  getters,
  actions,
  mutations
})
