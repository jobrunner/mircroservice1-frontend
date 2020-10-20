<template>
    <v-app id="main">
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                :mini-variant="primaryDrawer.mini"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                app
                overflow
        >
            <v-list nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title to="/">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="primaryDrawer.clipped" app>
            <v-app-bar-nav-icon v-if="primaryDrawer.type !== 'permanent'" @click.stop="primaryDrawer.model = !primaryDrawer.model"/>
            <v-toolbar-title>frontend</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
        <v-footer app >
            <span>&copy; {{ new Date().getFullYear() }} by Jo Brunner</span>
        </v-footer>
    </v-app>
</template>

<script>

export default {
    data: () => ({
        // drawers: ['Default (no property)', 'Permanent', 'Temporary'],
        primaryDrawer: {
            model: null,
            type: 'permanent',
            clipped: true,
            floating: false,
            mini: false,
        },
        // footer: {
        //     inset: false,
        // },
        items: [
            { title: 'Chat', icon: 'mdi-chat-processing-outline', to: "/chat"},
            { title: 'Settings', icon: 'mdi-cog', to: "/settings"},
        ],
    })
}
</script>
