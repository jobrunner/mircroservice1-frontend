const defaultState = () => {
    return {
        show: false,
        message: "",
    }
}

const actions = {
    show({commit}, show) {
        commit("SET_SHOW_ERROR", show)
    },
    message({commit}, message) {
        commit("SET_ERROR_MESSAGE", message);
    }
}

const mutations = {
    SET_SHOW_ERROR: (state, show) => {
        state.show = !!show
    },
    SET_ERROR_MESSAGE: (state, message) => {
        state.message = message
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    actions,
    mutations
}