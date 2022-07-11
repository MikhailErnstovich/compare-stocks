<template>
  <div class="home">
    <ul v-if="dataLoaded">
      <li v-for="(stock, idx) in stocks" :key="stock.ticker">
        <span>{{ idx + 1 }}</span>
        <span>{{ stock.ticker }}</span>
        <span>{{ stock.name }}</span>
        <span>{{ stock.mentions }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
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
    }),

    ...mapGetters({
      snp500Tickers: 'snp500/getTickers',
    }),
    
    stocks() {
      const result = [];
      for(let i = 0; i < this.snp500Tickers.length; i ++) {
        const stock = this.apeStocks.find(el => el.ticker === this.snp500Tickers[i]);
        if (stock) {
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