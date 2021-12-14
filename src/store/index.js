
import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import user from './users'
import profile from './profile'
import role from './role'
import auditTrail from './auditTrail'
import country from './country'
import treatment from './treatment'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      
    },
    mutations: {
      
    },
    actions: {
      
    },
    modules: {
        user: user,
        profile: profile,
        auth,
        role, 
        auditTrail: auditTrail, 
        country: country, 
        treatment: treatment
    }
});
