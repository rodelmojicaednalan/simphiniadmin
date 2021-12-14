import store from '@/store'
const routes = [
    {
        path: "/admin/reports/audit_trail",
        name: "AuditTrail",
        component: () => import ("../views/Reports/AuditTrail/Index.vue"),
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
        path: '/admin/users/create',
        name: "AuditTrailCreate",
        component: () => import ('../views/User/Create.vue'),
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
