import {createRouter, createWebHistory} from "vue-router";
import Content from "../components/content/Content.vue";
import Settings from "../components/settings/Settings.vue";
import NewDiagnose from "../components/settings/NewDiagnose.vue";
import ContinueCalculation from "../components/content/ContinueCalculation.vue";

const routes = [
    {
        path: '/calculate/:id',
        component: Content
    },
    {
        path: '/calculate/continue',
        component: ContinueCalculation
    },
    {
        path: '/settings/edit',
        component: Settings
    },
    {
        path: '/settings/new',
        component: NewDiagnose
    },
    {
        path: '/:catchAll(.*)',
        component: Settings
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;