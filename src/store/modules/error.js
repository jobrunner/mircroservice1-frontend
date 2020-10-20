const defaultState = () => {
    return {
        show: false,
        message: "",
        timeout: 5000
    }
}

const getters = {}

const actions = {
    show({commit}, show) {
        commit("SET_SHOW_ERROR", show)
    },
    message({commit}, message) {
        commit("SET_ERROR_MESSAGE", message);
    },

    timeout({commit}, timeout) {
        commit("SET_ERROR_TIMEOUT", timeout);
    },
}

const mutations = {
    SET_SHOW_ERROR: (state, show) => {
        state.show = !!show
    },
    SET_ERROR_MESSAGE: (state, message) => {
        state.message = message
    },
    SET_ERROR_TIMEOUT: (state, timeout) => {
        state.timeout = timeout
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    getters,
    actions,
    mutations
}