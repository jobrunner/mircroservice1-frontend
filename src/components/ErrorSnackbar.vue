<template>
    <v-snackbar
        v-model="show"
        timeout="-1"
        color="error"
    >
        {{ message }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="black"
                outlined
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
            }
        },
        timeout: {
            get() {
                return store.state.error.timeout
            }
        }
    }
}
</script>