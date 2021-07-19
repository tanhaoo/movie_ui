import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'
import propertyAdd from './modules/property-add'
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
import movieInformation from "@/store/modules/movieInformation";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        propertyAdd,
        movieInformation
    },
    state: {},
    mutations: {},
    actions: {},
    getters
})
