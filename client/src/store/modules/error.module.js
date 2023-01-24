export default {
  state: { errorMessage: "" },
  getters: { getErrorMessage: (state) => state.errorMessage },
  mutations: {
    setErrorMessage: (state, errorMessage) =>
      (state.errorMessage = errorMessage),
  },
  actions: {
    async setErrorMessage({ commit }, errorMessage) {
      commit("setErrorMessage", errorMessage);
    },
    async resetErrorMessage({ commit }) {
      commit("setErrorMessage", "");
    },
  },
};
