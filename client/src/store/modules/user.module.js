export default {
  state: {
    isAdmin: false,
  },
  getters: {
    isAdmin: (state) => state.isAdmin,
  },
  mutations: {
    setIsAdmin: (state, value) => (state.isAdmin = value),
  },
  actions: {
    setIsAdmin({ commit }, isAdmin) {
      commit("setIsAdmin", isAdmin);
    },
  },
};
