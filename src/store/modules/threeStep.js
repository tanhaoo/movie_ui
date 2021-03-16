const threeStep = {
    state: {cellMessage: []},
    mutations: {
        SET_FC_UNIT(state, payload) {
            state.cellMessage = payload.cellMessage
        }
    },
    actions: {},
    getters: {}
}

export default threeStep