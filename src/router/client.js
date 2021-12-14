import store from '@/store'
const routes = [
  {
    path: "/admin/clients/index",
    name: "Client",
    component: () => import ("../views/Client/Index.vue"),
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
    path: '/admin/clients/create',
    name: "ClientCreate",
    component: () => import ('../views/Client/Create.vue'),
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