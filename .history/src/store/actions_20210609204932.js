import axios from "axios";

export default {
    getDatas({ state, commit }, payload) {
        return axios
            .get("/api/plugins", { params: state.req })
            .then((res) => {
                if (payload == 'study') { commit('GET_STUDY_ARTICLES', res.data) }
                if (payload == 'life') { commit('GET_LIFE_ARTICLES', res.data) }
                console.log('getArticles ----',res.data );
            })
            .catch(function (err) { })
    },
}