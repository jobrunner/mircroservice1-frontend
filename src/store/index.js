import Vue from "vue"
import Vuex from "vuex"
import settings from '@/store/modules/settings'
import message from '@/store/modules/message'
import error from '@/store/modules/error'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const modules = {
    settings,
    message,
    error
}

const getters = {
    isReachable: state => {
        return (state.settings.isWebhookUrlReachable === true) 
            && (state.settings.isWebhookSecretIsValid === true)
            && (state.message.isAvailable === true)
    }
}

const store = new Vuex.Store({
    namespaced: true,
    strict: debug,
    modules,
    getters,
})

export default store