import axios from "axios"

const config = { 
    baseURL: process.env.VUE_APP_MICROSERVICE1_ENDPOINT,
    timeout: process.env.VUE_APP_MICROSERVICE1_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
}

const httpClient = axios.create(config)

export default {
    sendMessage: (message) => {
        return new Promise((resolve, reject) => {
            httpClient.post('/message', {message: message})
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    console.log("service/microservice1 sendMessage catch: ", error.response.status)
                    reject(error)
                })
        })
    },

    updateSettings: (settings) => {
        return new Promise((resolve, reject) => {            
            httpClient.post('/settings', settings)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        }
    )},

    retrieveSettings: () => {
        return new Promise((resolve, reject) => {            
            httpClient.get('/settings')
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

