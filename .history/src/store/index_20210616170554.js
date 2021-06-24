import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { createStore } from 'vuex'

export default createStore({
    state: {
        themeId: 0,
        language: 'cn',
        websites: {
            showAdd: false
        }
    },
    getters: {
        getTheme(states) {
            console.log('states.themeId', states.themeId);

            switch (states.themeId) {
                case 0:
                    return "themeBright";
                case 1:
                    return "themeWarm";
                case 2:
                    return "themeDark";
            }
        },
    },
    mutations: {
        CHANGE_THEME(state, i) {
            state.themeId = i
        },
        CHANGE_LANGUAGE(state, i) {
            state.language = i
        },
    },
    actions,
})
