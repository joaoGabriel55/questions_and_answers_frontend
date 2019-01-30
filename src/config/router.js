import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/home/Home.vue";
import AdminPages from "../components/admin/AdminPages.vue";
import Auth from "../components/auth/Auth.vue";

import { userKey } from "../global";

Vue.use(VueRouter);

const routes = [
    {
        name: "auth",
        path: "/auth",
        component: Auth
    },
    {
        name: "home",
        path: "/",
        component: Home
    },
    {
        name: "adminPages",
        path: "/admin",
        component: AdminPages,
        meta: { requiresAdmin: true }
    }
    // {
    //     name: "articlesByCategory",
    //     path: "/categories/:id/articles",
    //     component: ArticlesByCategory
    // },
    // {
    //     name: "articlesById",
    //     path: "/articles/:id",
    //     component: ArticlesById
    // }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey);
    
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json).user;
        user && user.profile === "ROLE_ADMIN" ? next() : next({ path: "/" });
    } else {
        next()
    }
});

export default router;
