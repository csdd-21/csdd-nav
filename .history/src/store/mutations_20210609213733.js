export default {
    GET_DATAS: (state, datas) => {
        state.res.datas = datas.datas
        state.res.total = datas.total
    },
    SET_REQ_DEFAULT: (state, payload) => {
        state.req = {
            title: "life",
            tags: state.tags,
            page: {
                skip: 1,
                limit: 2,
            }
        }
    },
    SET_REQ: (state, payload) => {
        console.log('params payload ---------------------- ', payload);
        if (payload.tags) {
            if (payload.tags.length == 0) {
                state.req.tags = state.tags
            } else {
                state.req.tags = payload.tags
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