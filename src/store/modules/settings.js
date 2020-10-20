import service from "@/services/microservice1"

const defaultState = () => {
    return {
        webhook: {
            url: "",
            secret: "",
        },
        isStored: false,
        isLoading: false,
        isWebhookUrlReachable: undefined,
        isWebhookSecretIsValid: undefined
    }
}

const getters = {
    // isReachable: state => {
    //     return state.isWebhookUrlReachable === true
    //            && state.isWebhookSecretIsValid === true
    // }

    // webhookUrl: state => {
    //     return state.webhook.url;
    // },
    // webhookSecret: state => {
    //     return state.webhook.secret
    // },
    // isStored: state => {
    //     return state.isStored
    // },
    // isReachable: state => {
    //     return state.isReachable
    // }
}

const actions = {
    setWebhookUrl({commit}, url) {
        console.log("store setting action: setWebhookUrl: ", url)
        commit('SET_WEBHOOK_URL', url);
        commit('SET_IS_STORED', false)
    },

    setWebhookSecret({commit}, secret) {
        console.log("store setting action: setWebhookSecret: ", secret)
        commit('SET_WEBHOOK_SECRET', secret)
        commit('SET_IS_STORED', false)
    },

    loadSettings({commit}) {
        console.log("action: loading settings...")
        // return new Promise((resolve, reject) => {
        commit("SET_IS_LOADING", true)
        service.retrieveSettings()
            .then(settings => {
                console.log("Settings from microservice1 returns:", settings.webhook)
                commit("SET_WEBHOOK_URL", settings.webhook.url)
                commit("SET_WEBHOOK_SECRET", settings.webhook.secret)
                commit("SET_IS_STORED", true)
                console.log("Send a test message to check whether the user has already valid settings")
                return service.sendMessage("ping")
            }, error => {
                console.log("Retriving settings from microservice1 failed: ", error.response.status)
                commit("SET_IS_STORED", false)

                // ????
                commit("SHOW_ERROR", {title: "Settings Error", body: "Could not load the settings. Here, show images of cats."}, { root: true })
            })
            .then(() => {
                console.log("Test message from microserve1 to microservice2 succeeded")
                commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                commit("SET_WEBHOOK_SECRET_IS_VALID", true)
                commit("SET_MESSAGE_SERVICE_AVAILABLE", true)
            }, error => {
                console.log("Testing call from microservice1 to microservice2 replies http status: ", error.response.status)
                switch (error.response.status) {
                    case 421: // endpoint not reachable
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", false)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                        break
                    case 403: // forbidden
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", false)
                        break
                    default:
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", undefined)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                }
            })
            .finally(() => {
                commit("SET_IS_LOADING", false)
            })
    },

    updateSettings({commit}, settings) {
        console.log("called action: updateSettings: ", settings)
        commit("SET_IS_LOADING", true)
        service.updateSettings(settings)
            .then(() => {
                console.log("updateSettings returns")
                commit("SET_IS_STORED", true)
                return service.sendMessage("ping")
            }, error => {
                console.log("Updating settings in microservice1 failed: ", error.response.status)
                commit("SET_IS_STORED", false)
                commit("SHOW_ERROR", {title: "Settings Error", body: "Settings could not been saved. Here, show images of cats."}, { root: true })
            })
            .then(pong => {
                console.log("PONG after updateSettings", pong)
                commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                commit("SET_WEBHOOK_SECRET_IS_VALID", true)
                commit("SET_MESSAGE_SERVICE_AVAILABLE", true)
            }, error => {
                console.log("Testing call from microservice1 to microservice2 replies http status: ", error.response.status)
                switch (error.response.status) {
                    case 421: // endpoint not reachable
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", false)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                        break
                    case 403: // forbidden
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", false)
                        break
                    default:
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", undefined)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                }
            })
            .finally(() => {
                commit("SET_IS_LOADING", false)
            })
    }
}

const mutations = {
    SET_WEBHOOK_URL: (state, url) => {
        console.log("called mutation: SET_URL", url);
        state.webhook.url = url
    },
    SET_WEBHOOK_SECRET: (state, secret) => {
        console.log("called mutation: SET_SECRET", secret);
        state.webhook.secret = secret
    },
    SET_IS_STORED: (state, isStored) => {
        console.log("called mutation: SET_IS_STORED", isStored);
        state.isStored = isStored
    },
    SET_IS_LOADING: (state, isLoading) => {
        console.log("called mutation: SET_IS_LOADING", isLoading);
        state.isLoading = isLoading
    },
    SET_WEBHOOK_URL_IS_REACHABLE: (state, isReachable) => {
        state.isWebhookUrlReachable = isReachable
    },
    SET_WEBHOOK_SECRET_IS_VALID: (state, isValid) => {
        state.isWebhookSecretIsValid = isValid
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    getters,
    actions,
    mutations
}