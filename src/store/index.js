import Vue from "vue"
import Vuex from "vuex"
import settings from '@/store/modules/settings'
import message from '@/store/modules/message'
import error from '@/store/modules/error'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const defaultState = () => {
    return {}
}

const modules = {
    settings,
    message,
    error
}

const getters = {
    isReachable: state => {
        return state.settings.webhookIsReachable 
               && state.settings.webhookSecretIsValid
               && state.message.isAvailable
    }
}

const actions = {}

const mutations = {}

const store = new Vuex.Store({
    namespaced: true,
    strict: debug,
    state: defaultState,
    modules,
    getters,
    actions,
    mutations
})

export default store