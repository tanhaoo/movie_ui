const oneStep = {
    state: {
        buildingNumber: '',
        estateCode: ''
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.buildingNumber = payload.buildingNumber
            state.estateCode = payload.estateCode
        }
    },
    actions: {},
    getters: {}
}
export default oneStep
