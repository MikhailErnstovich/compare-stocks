export default {
  namespaced: true,
  state() {
    return {
      units: 'mentions',
      threshold: 5,
    }
  },
  actions: {
    setThreshold({ commit }, num) {
      commit('setThreshold', num);
    },
    setUnits({ commit }, unit) {
      commit('setUnits', unit)
    }
  },
  mutations: {
    setThreshold(state, num) {
      state.threshold = num;
    },
    setUnits(state, unit) {
      state.units = unit;
    }
  },
  getters: {
    units(state) {
      return state.units;
    },
    threshold(state) {
      return state.threshold;
    }
  }
}