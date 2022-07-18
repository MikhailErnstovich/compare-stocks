export default {
  namespaced: true,
  state() {
    return {
     listToggle: false,
    }
  },
  actions: {
    toggleList({ commit }) {
      commit('toggleList');
    }
  },
  mutations: {
    toggleList(state) {
      state.listToggle = !state.listToggle;
    }
  },
  getters: {
    listToggle(state) {
      return state.listToggle
    }
  }
}