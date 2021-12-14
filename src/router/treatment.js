import store from '@/store'
const routes = [
    {
        path: "/admin/picklists/treatment",
        name: "TreamentList",
        component: () => import ("../views/Picklists/Treatment/Index.vue"),
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
                return next({
                    name: "SignIn"
                });
            }
            next();
        }
    },
    {
        path: '/admin/picklists/country/create',
        name: "TreatmentCreate",
        component: () => import ("../views/Picklists/Country/Create.vue"),
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
                return next({
                    name: "SignIn"
                });
            }
            next();
        }
    }
]

export default routes
