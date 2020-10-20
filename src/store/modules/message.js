const defaultState = () => {
    return {
        message: '',
        messages: [],
        isAvailable: false,
        isLoading: false
    };
};

const getters = {}

const actions = {
    sendMessage({commit}, message) {
        console.log("called action: sendMessage: ", message)
        commit("SET_MESSAGE", "")
        commit("SET_MESSAGE_LOADING", true)

        // asynchron message verschicken
        commit('ADD_MESSAGE', message);


        // finaly:
        commit("SET_MESSAGE_LOADING", false)

    },
}

const mutations = {
    ADD_MESSAGE: (state, message) => {
        console.log("called mutation: SEND_MESSAGE", message);
        state.messages.push({message: message, author: "client"})
    },
    SET_MESSAGE: (state, message) => {
        console.log("called mutation: SET_MESSAGE", message);
        state.message = message
    },
    SET_MESSAGE_LOADING: (state, isLoading) => {
        console.log("called mutation: SET_MESSAGE_LOADING", isLoading);
        state.isLoading = isLoading
    },
    SET_MESSAGE_SERVICE_AVAILABLE: (state, isAvailable) => {
        console.log("called mutation: SET_MESSAGE_SERVICE_AVAILABLE", isAvailable);
        state.isAvailable = isAvailable
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    getters,
    actions,
    mutations
}