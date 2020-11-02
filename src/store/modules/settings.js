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

const actions = {
    setWebhookUrl({commit}, url) {
        commit('SET_WEBHOOK_URL', url);
        commit('SET_IS_STORED', false)
    },

    setWebhookSecret({commit}, secret) {
        commit('SET_WEBHOOK_SECRET', secret)
        commit('SET_IS_STORED', false)
    },

    // Loads settings from settings service
    loadSettings({commit}) {
        commit("SET_IS_LOADING", true)
        service.retrieveSettings()
            .then(settings => {
                // Settings (aka webhook and secret) retrieved from microservice1
                // so we can commit:
                commit("SET_WEBHOOK_URL", settings.webhook.url)
                commit("SET_WEBHOOK_SECRET", settings.webhook.secret)

                // Because we retrieved stored settings, we should commit the state also:
                commit("SET_IS_STORED", true)

                // Send a test message to check whether the user has already valid settings
                return service.sendMessage("ping")
            }, error => {
                // Commit the state that microservice1 did not return anything we can work with
                commit("SET_IS_STORED", false)
                commit("SET_WEBHOOK_URL_IS_REACHABLE", false)
                commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)

                // Ok, 503 comes from microservice1 if I forget to start the mongo:
                if (error.response.status == 503) {
                    commit("error/SET_ERROR_MESSAGE", "Mongo is down or not reachable.", { root: true })
                    commit("error/SET_SHOW_ERROR", true, { root: true })
                } else {
                    commit("error/SET_ERROR_MESSAGE", "Could not load the settings. Here, show images of cats.", { root: true })
                    commit("error/SET_SHOW_ERROR", true, { root: true })
                }
                commit("message/SET_MESSAGE_SERVICE_AVAILABLE", false, {root: true})
            })
            .then(() => {
                // Test message ("ping") from microserve1 to microservice2 succeeded
                commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                commit("SET_WEBHOOK_SECRET_IS_VALID", true)
                commit("message/SET_MESSAGE_SERVICE_AVAILABLE", true, {root: true})
            }, error => {
                // Testing call from microservice1 to microservice2 has been failed (but we usualy know the http status):
                switch (error.response.status) {
                    case 421: // endpoint not reachable
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", false)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                        break
                    case 403: // forbidden
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", false)
                        break
                    default: // undefined
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
                // Settings could be stored
                commit("SET_IS_STORED", true)

                // But can we talk? Send an simple ping message
                return service.sendMessage("ping")
            }, error => {
                // Updating settings in microservice1 failed. A 503 https status tells us, that the mongo is down

                // Commit the state that microservice1 did not return anything we can work with
                commit("SET_IS_STORED", false)

                // Ok, 503 comes from microservice1 if I forget to start the mongo:
                if (error.response.status == 503) {
                    commit("error/SET_ERROR_MESSAGE", "Mongo is down or not reachable.", { root: true })
                    commit("error/SET_SHOW_ERROR", true, { root: true })
                } else {
                    commit("error/SET_ERROR_MESSAGE", "Could not update the settings. Here, show images of cats.", { root: true })
                    commit("error/SET_SHOW_ERROR", true, { root: true })
                }
            })
            .then(() => {
                // PONG after updateSettings was fine. We can use all services to talk:
                commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                commit("SET_WEBHOOK_SECRET_IS_VALID", true)
                commit("message/SET_MESSAGE_SERVICE_AVAILABLE", true, {root: true})
            }, error => {
                // Testing call from microservice1 to microservice2 responds with an error. Normaly an explicit http status:
                switch (error.response.status) {
                    case 421: // endpoint not reachable
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", false)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                        break
                    case 403: // forbidden
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", true)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", false)
                        break
                    default: // status undefined
                        commit("SET_WEBHOOK_URL_IS_REACHABLE", undefined)
                        commit("SET_WEBHOOK_SECRET_IS_VALID", undefined)
                }
                commit("message/SET_MESSAGE_SERVICE_AVAILABLE", false, {root: true})
            })
            .finally(() => {
                commit("SET_IS_LOADING", false)
            })
    }
}

const mutations = {
    SET_WEBHOOK_URL: (state, url) => {
        state.webhook.url = url
    },

    SET_WEBHOOK_SECRET: (state, secret) => {
        state.webhook.secret = secret
    },

    SET_IS_STORED: (state, isStored) => {
        state.isStored = isStored
    },

    SET_IS_LOADING: (state, isLoading) => {
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
    actions,
    mutations
}