import { apeWisdom } from '@api';

export default {
  namespaced: true,
  state() {
    return {
      apeStocks: [],
      pages: 0,
      dataLoaded: false,
    }
  },
  actions: {
    async fetchPages({ commit }) {
      try {
        const data = await apeWisdom.getApePages();
        commit('saveApePages', data);
      }
      catch (err) {
        throw new Error(err);
      }
    },
    async fetchStocks({ commit, dispatch, state }) {
      try {
        await dispatch('fetchPages');
      }
      catch (err) {
        throw new Error(err);
      }
      
      const promises = [];
      for(let i = 1; i <= state.pages; i++) {
        promises.push(apeWisdom.getApeStocks(i));
      }
      try {
        await Promise.all(promises).then(values => {
          const result = values.reduce((acc, cur) => { 
            acc.push(...cur.results)
            return acc;
          }, []);
          commit('saveApeStocks', result);
        });
      }
      catch (err) {
        throw new Error(err);
      }
    }
  },
  mutations: {
    saveApePages(state, data) {
      state.pages = data;
    },
    saveApeStocks(state, data) {
      state.apeStocks.push(...data);
      state.dataLoaded = true;
      console.log('apes saved');
    }
  },
  getters: {
    getTickers(state) {
      return state.apeStocks.map(el => el.ticker);
    }
  }
}