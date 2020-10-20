<template>
    <v-snackbar
        v-model="show"
        :timeout="timeout"
    >
        {{ message }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="show = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import store from '@/store'

export default {
    computed: {
        show: {
            get() {
                return store.state.error.show
            },
            set(value) {
                store.commit("error/SET_SHOW_ERROR", value)
            }
        },
        message: {
            get() {
                return store.state.error.message
            },
            set(value) {
                store.commit("error/SET_ERROR_MESSAGE", value)
            }
        },
        timeout: {
            get() {
                return store.state.error.timeout
            },
            set(value) {
                store.commit("error/SET_ERROR_TIMEOUT", value)
            }
        }
    }
}
</script>