<template>
    <section class="chat-bot-box" v-if="isReachable === true">
        <div class="chat-bot-box-list-container" ref="chatbotbox">
            <ul class="chat-bot-box-list">
                <li 
                    class="message"
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="message.author"
                >
                    <p>
                        <span class="author">{{ message.name }}</span>
                        <span class="text">{{ message.text }}</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="chat-bot-box-input">
            <input 
                type="text" 
                v-model="message" 
                @keyup.enter="sendMessage" 
                placeholder="Your message here"
            />
            <v-btn 
                color="primary" 
                @click="sendMessage"
                class="ma-2"
                right
                :loading="isLoading"
            >
                <v-icon>mdi-send-outline</v-icon>
            </v-btn>
        </div>
    </section>
    <section class="chat-bot-box-disabled" v-else>
        <v-alert
            text
            prominent
            color="error"
        >
            <h3 class="headline">Chat inactive</h3>
            <div>To reactivate the chat, please configure the backend for microservice2, so the connection can be established.</div>
            <v-divider class="my-4 error" style="opacity: 0.22" />
            <v-row align="center" no-gutters>
                <v-col class="grow">
                </v-col>
                <v-spacer />
                <v-col class="shrink">
                    <v-btn
                        color="error"
                        outlined
                        to="/settings"
                    >
                        Configure
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </section>
</template>

<script>
import service from "../services/microservice1"
import store from '@/store'

export default {
    name: 'ChatBotBox',
    data: () => ({
        message: '',
        messages: [],
        isLoading: false,
        isAvailable: true,
        firstname: "Vorname",
        lastname: "Nachname"
    }),
    computed: {
        isReachable() {
            return (store.state.settings.isWebhookUrlReachable === true) 
                && (store.state.settings.isWebhookSecretIsValid === true)
                && (store.state.message.isAvailable === true)
        }
    },
    methods: {
        sendMessage() {

            // store.dispatch("message/sendMessage", {message: this.message})

            if (!this.message || !this.isAvailable) {
                return
            }

            this.isLoading = true
            this.messages.push({text: this.message, author: "client", name: "You"});

            service.sendMessage(this.message)
                .then(answer => {
                    const replacements = {"{{firstname}}": this.firstname, "{{lastname}}": this.lastname}
                    const replaced = answer.message.replace(/{{\w+}}/g, function(all) {
                        return replacements[all] || all;
                    })
                    answer.message = replaced

                    this.messages.push({text: answer.message, author: "server", name: "Bot"});
                    this.message = ""
                    this.$nextTick(() => {
                        this.$refs.chatbotbox.scrollTop = this.$refs.chatbotbox.scrollHeight;
                    })
                    this.isLoading = false
                }, error => {
                    console.log(error);
                    this.isLoading = false
                })
        }
    },
    
    created() {
        // We send a silent message to check wheter the bot is reachable
        store.dispatch("message/sendMessage", {message: "ping"})
    }

}
</script>

<style scoped lang="scss">  
.chat-bot-box, 
.chat-bot-box-list {
    display: flex;
    flex-direction: column;
    list-style: none;
}

.chat-bot-box-list-container {
    margin: 0 0 auto 0;
    overflow: scroll;
}

.chat-bot-box {
    border-radius: 4px;
    height: 400px;
    width: 400px;    
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

.chat-bot-box-list {
    padding: 15px;
    margin: auto 0 0 0;

    span {
      display: block;
      padding: 8px;
      color: white;
      border-radius: 15px;
    }

    span.author {
      color: #999;
      font-size: 70%;
      line-height: 70%;
    }

    .server {
        span.text {
            background-color: blue;
            border-top-left-radius: 0;
        }
      
        p {
            float: left;
            text-align: left;
        }
    }
    
    .client {
        span.text {
            background-color: green;
            border-top-right-radius: 0;
        }
        p {
            float: right;
            text-align: right;
        }
    }
}
  
.chat-bot-box-input {
    display: flex;
  
    input {
        line-height: 3;
        width: 100%;
        border: 1px solid lightgrey;
        border-left: none;
        border-bottom: none;
        border-bottom-left-radius: 15px;
        padding-left: 15px;
        padding-right: 15px;
    }

    input:focus {
        outline: none;
        box-shadow: none;
    }
}
</style>