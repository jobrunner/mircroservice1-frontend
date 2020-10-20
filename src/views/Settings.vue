<template>
    <v-container>
        <v-row
                align="center"
                justify="center"
        >
            <v-col cols="12" sm="8" md="4">
                <Settings />
            </v-col>
        </v-row>
        <ErrorSnackbar />
    </v-container>
</template>

<script>
import Settings from '@/components/Settings'
import ErrorSnackbar from "@/components/ErrorSnackbar"

export default {
    components: {
        Settings,
        ErrorSnackbar
    }
}
</script>

