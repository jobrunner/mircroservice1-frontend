<template>
    <v-container>
        <v-row
                align="center"
                justify="center"
        >
            <v-col cols="12" sm="8" md="4" xstyle="background-color: red;">
                <ChatBotBox />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ChatBotBox from '@/components/ChatBotBox'

export default {
    components: {
        ChatBotBox
    }
}
</script>

<style scoped lang="scss">
</style>