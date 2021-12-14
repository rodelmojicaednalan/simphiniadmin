import axios from "axios";
export default {
  namespaced: true,

  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },

  actions: {
    async attempt({ commit, state }, token) {
      console.log(token);
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get("admin/superuser");
        commit("SET_USER", response.data);
        console.log(response.data)
        localStorage.setItem("authuser", JSON.stringify(response.data));
        // localStorage.setItem("token", JSON.stringify(response.data));
      } catch (e) {
        console.log("failed");
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async signUp({ dispatch }, request) {
      let response = await axios.post("/admin/register", request);
      return dispatch("attempt", response.data.token);
    },

    async signIn({ dispatch }, request) {
      let response = await axios.post("/admin/login", request);
      console.log(response)
      return dispatch("attempt", response.data.token);
    },

    signOut() {
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("token");
      localStorage.removeItem("authuser");
    }
  }
};
