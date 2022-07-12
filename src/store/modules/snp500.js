import { snp500 } from '@api';

export default {
  namespaced: true,
  state() {
    return {
      snp500: [],
      GICS: [
        'Energy',
        'Materials',
        'Industrials',
        'Consumer Discretionary',
        'Consumer Staples',
        'Health Care',
        'Financials',
        'Information Technology',
        'Communication Services',
        'Utilities',
        'Real Estate'
      ],
    }
  },
  actions: {
    async fetchSnp500({ commit }) {
      try {
        const data = await snp500.getSnp500();
        commit('saveSnp500', data);
      }
      catch (err) {
        throw new Error(err);
      }
    }
  },
  mutations: {
    saveSnp500(state, data) {   
      state.snp500 = data.parse.wikitext['*'].split('\n|-\n|').slice(1).map(el => {
        return {
          ticker: el.split('\n')[0].split('|')[1].replace('}}','').split(' <!')[0],
          exchange: el.split('\n')[0].split('|')[0].replace('{{','').replace('Symbol',''),
          name: el.split('|[[')[1].split(']]')[0],
          GICS: el.split('||')[2].trim()
        };
      });
    },

  },
  getters: {
    getTickers(state) {
      return state.snp500.map(el => el.ticker);
    }
  }
}