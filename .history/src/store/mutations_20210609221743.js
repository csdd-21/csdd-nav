export default {
    GET_DATAS: (state, datas) => {
        state.res.datas = datas.datas
        state.res.total = datas.total
    },
    SET_REQ_DEFAULT: (state, payload) => {
        state.req = {
            title: "",
            tags: state.tags,
            page: {
                skip: 1,
                limit: 2,
            }
        }
    },
    SET_REQ: (state, payload) => {
        if (payload.checkTags) {
            if (payload.checkTags.length == 0) {
                state.req.checkTags = state.req.tags
            } else {
                state.req.checkTags = payload.checkTags
            }
        }
        if (payload.sort) {
            state.req.page.sort = payload.sort
        }
        if (payload.skip) {
            state.req.page.skip = payload.skip
        }
    },
}