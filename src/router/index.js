import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

import usersRoutes from './user'
import profileRoutes from './profile'
import settingsRoutes from './settings'
import reportsRoutes from './reports'
import salesAndInvoiceRoutes from './salesAndInvoice'
import countryRoutes from './country'
import treatmentRoutes from './treatment'
import auditTrailRoutes from './auditTrail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/SignIn.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Dashboard"
        });
      }
      next();
    }
  },
  {
    path: "/admin/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Dashboard"
        });
      }
      next();
    }
  },
  {
    path: "/admin/login",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({
          name: "Dashboard"
        });
      }
      next();
    }
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
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
    path: "/admin/clients",
    name: "Clients",
    component: () => import("../views/Clients/Index.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "SignIn"
        });
      }
      next();
    }
  },
  ...usersRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  ...reportsRoutes,
  ...salesAndInvoiceRoutes,
  ...countryRoutes, 
  ...treatmentRoutes,
  ...auditTrailRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
