import { createApp } from 'vue'
import './style.css'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './router/index';
import { userToken } from "@/utils/storageKeys"
import ElementPlus from 'element-plus';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (['login', 'home'].includes(to.name)) {
        return true;
    }
    if (!localStorage.getItem(userToken)) {
        router.push({
            name: 'login'
        })
        return false
    }
    return true
})

createApp(App).use(ElementPlus).use(router).mount('#app')