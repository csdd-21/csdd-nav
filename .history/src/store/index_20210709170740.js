import { createStore } from 'vuex'

export default createStore({
    state: {
        themeId: 0,
        language: 'cn',
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
})
