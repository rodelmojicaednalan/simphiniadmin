import store from '@/store'
const routes = [
    {
        path: "/admin/picklists/country",
        name: "CountryList",
        component: () => import ("../views/Picklists/Country/Index.vue"),
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
        name: "CountryCreate",
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
