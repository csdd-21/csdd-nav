import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    life: {
      tags: ["memory", "music", "travel", "delicacy"],
      req: {
        parent: "life",
        checkTags: ["memory", "music", "travel", "delicacy"],
        sort: -1,
        skip: 1,
        limit: 100,
      },
      res: {
        datas: [],
        total: 0,
      }
    },
    tags: ["vscode", "animation", "sidebar"],
    req: {
      title: "",
      tags: [],
      sort: -1,
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
