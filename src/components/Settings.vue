<template>
    <v-card>
        <v-card-title>Webhook Settings</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    :value="webhookUrl"
                    @input="updateWebhookUrl"
                    label="Webhook Url"
                    prepend-icon="mdi-link"
                    type="text"
                >
                    <template v-slot:append v-if="validWebhookUrl === true">
                        <v-icon color="green">mdi-check-bold</v-icon>
                    </template>
                    <template v-slot:append v-else-if="validWebhookUrl === false">
                        <v-icon color="red">mdi-thumb-down-outline</v-icon>
                    </template>                    
                    <template v-slot:append v-else>
                        <v-icon color="gray">mdi-head-question-outline</v-icon>
                    </template>                
                </v-text-field>

                <v-text-field
                    :value="webhookSecret"
                    @input="updateWebhookSecret"
                    label="Secret"
                    prepend-icon="mdi-key"
                    type="text"
                >
                    <template v-slot:append v-if="validWebhookSecret === true">
                        <v-icon color="green">mdi-check-bold</v-icon>
                    </template>
                    <template v-slot:append v-else-if="validWebhookSecret === false">
                        <v-icon color="red">mdi-thumb-down-outline</v-icon>
                    </template>                    
                    <template v-slot:append v-else>
                        <v-icon color="gray">mdi-head-question-outline</v-icon>
                    </template>                
                </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" @click="updateSettings(webhookUrl, webhookSecret)">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import store from '@/store'

export default {
    computed: {
        webhookUrl() {
            return store.state.settings.webhook.url
        },
        webhookSecret() {
            return store.state.settings.webhook.secret
        },
        buttonColor() {
            return store.state.settings.isStored === true ? "normal" : "primary"
        },
        isLoading() {
            return store.state.settings.isLoading
        },
        validWebhookUrl() {
            return store.state.settings.isWebhookUrlReachable
        },
        validWebhookSecret() {
            return store.state.settings.isWebhookSecretIsValid
        }
    },

    methods: {
        updateWebhookUrl(url) {
            store.dispatch("settings/setWebhookUrl", url)
        },
        updateWebhookSecret(secret) {
            store.dispatch("settings/setWebhookSecret", secret)
        },
        updateSettings(url, secret) {
            store.dispatch("settings/updateSettings", {
                webhook: {
                    url: url, 
                    secret: secret
                }
            })
        }
    },

    created() {
        store.dispatch("settings/loadSettings")
    }
}
</script>