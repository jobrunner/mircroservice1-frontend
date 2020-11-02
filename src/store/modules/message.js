const defaultState = () => {
    return {
        message: '',
        messages: [],
        isAvailable: false,
        isLoading: false
    };
};

const actions = {
    // Todo: Refactor ChatBotBox and call microservice1/message here
    sendMessage({commit}, message) {
        
        commit("SET_MESSAGE", "")
        commit("SET_MESSAGE_LOADING", true)

        // send message asynchron
        commit('ADD_MESSAGE', message)

        // finaly:
        commit("SET_MESSAGE_LOADING", false)
    },
}

const mutations = {
    ADD_MESSAGE: (state, message) => {
        state.messages.push({message: message, author: "client"})
    },

    SET_MESSAGE: (state, message) => {
        state.message = message
    },

    SET_MESSAGE_LOADING: (state, isLoading) => {
        state.isLoading = isLoading
    },

    SET_MESSAGE_SERVICE_AVAILABLE: (state, isAvailable) => {
        state.isAvailable = isAvailable
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    actions,
    mutations
}