import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '@/views/Chat'
import Settings from '@/views/Settings'

Vue.use(VueRouter);

const routes = [
    {
        name: 'Chat',
        path: '/',
        component: Chat
    },
    {
        name: 'Settings',
        path: '/settings',
        component: Settings
    },
];

const router = new VueRouter({
    routes
});

export default router
