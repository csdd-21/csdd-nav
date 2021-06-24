export default {
    GET_DATAS: (state, datas) => {
        state.res.datas = datas.datas
        state.res.total = datas.total
    },
    SET_PARAMS_DEFAULT: (state, payload) => {
        if (payload == 'study') {
            state.study = {
                tags: ["js", "ts", "css", "node"],
                req: {
                    parent: "study",
                    checkTags: ["js", "ts", "css", "vue", "node"],
                    sort: -1,
                    skip: 1,
                    limit: 5,
                },
                res: {
                    datas: [],
                    total: 0,
                }
            }
            return
        }
        if (payload == 'life') {
            state.life = {
                tags: ["memory", "music", "travel", "delicacy"],
                req: {
                    parent: "life",
                    checkTags: ["memory", "music", "travel", "delicacy"],
                    sort: -1,
                    skip: 1,
                    limit: 3,
                },
                res: {
                    datas: [],
                    total: 0,
                }
            }
            return
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
            state.req.sort = payload.sort
        }
        if (payload.skip) {
            state.req.skip = payload.skip
        }
    },
}