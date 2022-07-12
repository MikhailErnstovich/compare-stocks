<template>
  <div class="home">
    <TreeMap v-if="dataLoaded" :stocks="tree"/>
    <span v-else>Loading...</span>
  </div>
</template>

<script>
import TreeMap from '@components/TreeMap.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { TreeMap },
  data() {
    return {
      dataLoaded: false,
    }
  },
  methods: {
    ...mapActions({
      fetchSnp500: 'snp500/fetchSnp500',
      fetchApeStocks: 'apeWisdom/fetchStocks',
    }),
    
  },
  computed: {
    ...mapState({
      snp500: state => state.snp500.snp500,
      apeStocks: state => state.apeWisdom.apeStocks,
      GICS: state => state.snp500.GICS,
    }),

    ...mapGetters({
      snp500Tickers: 'snp500/getTickers',
    }),
    
    stocks() {
      const result = [];
      for(let i = 0; i < this.snp500.length; i ++) {
        const stock = this.apeStocks.find(el => el.ticker === this.snp500[i].ticker);
        if (stock) {
          stock.GICS = this.snp500[i].GICS;
          result.push(stock);
        }
      }
      return result.sort((a, b) => {
        if (a.rank > b.rank) {
          return 1;
        } else if (a.rank < b.rank) {
          return -1;
        } else {
          return 0;
        }
      });
    },

    tree() {
      const tree = this.GICS.reduce((acc, cur) => {
        acc.push({ name: cur, children: [] });
        return acc
      }, []);
      this.stocks.forEach(stock => {
        const treeItem = tree.find(el => el.name === stock.GICS);
        if (treeItem) {
          treeItem.children.push({ name: stock.ticker, value: +stock.mentions })
        }
      })
      return tree;
    }
  },

  async created() {
    try {
      await this.fetchSnp500();
      await this.fetchApeStocks();
      this.dataLoaded = true;
    }
    catch (err) {
      throw(err);
    }
  }
}
</script>

<style scoped>
 button {
  display: block;
 }
 li {
  display: flex;
 }
 span {
  margin: 5px;
 }
</style>