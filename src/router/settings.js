import store from '@/store'
const routes = [
  {
    path: "/admin/settings/email",
    name: "Email Settings",
    component: () => import("../views/Settings/SettingsEmail.vue"),
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
    path: "/admin/settings/network",
    name: "Network Configuration",
    component: () => import("../views/Settings/NetworkConfiguration.vue"),
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
    path: "/admin/settings/backup-restoration",
    name: "Backup & Restoration",
    component: () => import("../views/Settings/BackupAndRestoration.vue"),
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
    path: "/admin/settings/modes",
    name: "Night/Day Modes",
    component: () => import("../views/Settings/Modes.vue"),
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
    path: "/admin/settings/manage-properties",
    name: "Print/Export Properties",
    component: () => import("../views/Settings/Properties.vue"),
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