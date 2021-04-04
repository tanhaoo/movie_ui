const selectStatus = {
    state: {queryCondition: {}},
    mutations: {
        SELECT_STATUS(state, payload) {
            state.queryCondition = payload.queryCondition
        }
    },
    actions: {},
    getters: {}
}

export default selectStatus