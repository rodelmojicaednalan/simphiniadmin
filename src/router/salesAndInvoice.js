import store from '@/store'
const routes = [
    {
        path: "/admin/sales_and_invoice/sales",
        name: "Sales",
        component:() => import ('../views/SalesAndInvoice/Sales.vue'),
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
      path: "/admin/sales_and_invoice/invoice",
      name: "Invoice",
      component:() => import ('../views/SalesAndInvoice/Invoice.vue'),
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