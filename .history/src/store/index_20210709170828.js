import { createStore } from 'vuex'

export default createStore({
    state: {
        themeId: 0,
        language: 'cn',
    },
    mutations: {
        CHANGE_THEME(state, i) {
            state.themeId = i
        },
        CHANGE_LANGUAGE(state, i) {
            state.language = i
        },
    },
})
