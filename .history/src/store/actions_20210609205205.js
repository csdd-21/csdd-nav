import axios from "axios";

export default {
    getDatas({ state, commit }, payload) {
        return axios
            .get("/api/plugins", { params: state.req })
            .then((res) => {
                if(res.status==200){
                    commit('GET_DATAS', res.data) 
                }
                console.log('getArticles ----',res.data);
            })
            .catch(function (err) { })
    },
}