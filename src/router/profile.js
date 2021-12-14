import store from '@/store'
const routes = [
    {
        path: "/admin/profile",
        name: "Profile",
        component:() => import ('../views/Profile/Index.vue'),
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