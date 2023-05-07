import Home from "@/app/views/home/index.vue"
import Appointment from "@/app/views/appointment/index.vue";
import Appointmented from "@/app/views/appointmented/index.vue";
import Login from "@/app/views/login/index.vue"
import CommonSense from "@/app/views/common-sense/index.vue"

export const FeRoutes = [
    {
        path: '',
        name: 'home',
        component: Home,
    },
    {
        path: 'appointment',
        component: Appointment
    },
    {
        path: 'appointmented',
        component: Appointmented,
    },
    {
        path: 'login',
        name: 'login',
        component: Login,
    },
    {
        path: 'common-sense',
        name: 'common-sense',
        component: CommonSense,
    }
]