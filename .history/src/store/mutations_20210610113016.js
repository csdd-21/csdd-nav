export default {
    GET_TAGS: (state, datas) => {
        state.req.tags = datas.tags
    },
    GET_DATAS: (state, datas) => {
        state.res.datas = datas.datas
        state.res.total = datas.total
    },
    SET_REQ_DEFAULT: (state, payload) => {
        let temp = JSON.parse(JSON.stringify(state.req.tags) )
        state.req = {
            title: "",
            checkTags: state.req.tags,
            page: {
                skip: 1,
                limit: 2,
            }
        }
        state.req.tags = temp
    },
    SET_REQ: (state, payload) => {
        if (payload.title) {
            state.req.title = payload.title
        }
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
        console.log('SET_REQ payload ---',state);
        
        
    },
}