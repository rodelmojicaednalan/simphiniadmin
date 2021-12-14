import store from '@/store'
const routes = [
  {
    path: "/admin/users",
    name: "Users",
    component: () => import ("../views/User/Users.vue"),
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
    name: "UserCreate",
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
