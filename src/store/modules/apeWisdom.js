import { apeWisdom } from '@api';

export default {
  namespaced: true,
  state() {
    return {
      apeStocks: [],
      pages: 0,
    }
  },
  actions: {
    async fetchPages({ commit }) {
      try {
        const data = await apeWisdom.getApePages();
        commit('saveApePages', data)
      }
      catch (err) {
        throw err;
      }
    },
    async fetchStocks({ commit, dispatch, state }) {
      try {
        await dispatch('fetchPages');
      }
      catch (err) {
        throw err;
      }

      for(let i = 1; i <= state.pages; i++) {
        try {
          const data = await apeWisdom.getApeStocks(i);
          commit('saveApeStocks', data)
        }
        catch (err) {
          throw err;
        }
      }
    }
  },
  mutations: {
    saveApePages(state, data) {
      state.pages = data;
    },
    saveApeStocks(state, data) {
      state.apeStocks.push(...data.results);
    }
  },
  getters: {
    getTickers(state) {
      return state.apeStocks.map(el => el.ticker)
    }
  }
}