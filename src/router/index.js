import FEApp from "@/app/index.vue"
import AdminApp from "@/admin/index.vue"
import { FeRoutes } from './fe-router';
import { AdminRoutes } from "./admin-router";

export const routes = [
    { path: '/', component: FEApp, children: FeRoutes },
    { path: '/admin', component: AdminApp, children: AdminRoutes },
]
