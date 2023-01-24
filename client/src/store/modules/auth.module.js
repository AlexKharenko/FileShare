import statusHandler from "../../handlers/status.handler";
import { getRequest, postRequest } from "../../handlers/request.handler";

export default {
  state: { isAuthenticated: false },
  getters: { isAuthenticated: (state) => state.isAuthenticated },
  mutations: {
    setIsAuthenticated: (state, value) => (state.isAuthenticated = value),
  },
  actions: {
    async Login({ commit, dispatch }, data) {
      const response = await postRequest("/auth/login", data);
      const result = await statusHandler(response);
      if (result.success) {
        commit("setIsAuthenticated", true);
        dispatch("setIsAdmin", result.isAdmin, { root: true });
      } else commit("setIsAuthenticated", false);
      return result;
    },
    async CheckAuthorization({ commit, dispatch }) {
      const response = await getRequest("/auth/check");
      const result = await statusHandler(response);
      if (result?.success) {
        commit("setIsAuthenticated", true);
        dispatch("setIsAdmin", result.isAdmin, { root: true });
      } else commit("setIsAuthenticated", false);
      return result;
    },
    async Logout({ commit, dispatch }) {
      const response = await postRequest("/auth/logout", {});
      const result = await statusHandler(response);
      commit("setIsAuthenticated", false);
      dispatch("setIsAdmin", false, { root: true });
      return result;
    },
  },
};
