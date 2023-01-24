export default {
  state: { loadingStatus: false },
  getters: { getLoadingStatus: (state) => state.loadingStatus },
  mutations: {
    setLoadingStatus: (state, loadingStatus) =>
      (state.loadingStatus = loadingStatus),
  },
  actions: {
    setLoadingStatus({ commit }, loadingStatus) {
      commit("setLoadingStatus", loadingStatus);
    },
  },
};
