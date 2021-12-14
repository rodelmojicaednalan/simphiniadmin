import store from '@/store'
const routes = [
    {
        path: "/admin/reports/analytics",
        name: "Analytics",
        component:() => import ('../views/Reports/Analytics.vue'),
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
      path: "/admin/reports/revenue",
      name: "Revenue",
      component:() => import ('../views/Reports/Revenue.vue'),
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