<template>
  <el-container class="home">
    <el-main>
        <el-row :gutter="20">
          <el-col :sm="24" :lg="16">      
            <TreeMap :stocks="stocks"/>
          </el-col>
          <el-col :sm="24" :lg="8">
            <StockList :stocks="stocks"/>
          </el-col>
        </el-row>
    </el-main>
  </el-container>
</template>

<script>
import TreeMap from '@components/TreeMap.vue';
import StockList from './components/StockList.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { TreeMap, StockList },
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
    async fetchData() {
      await this.fetchSnp500();
      await this.fetchApeStocks();
    }
  },
  computed: {
    ...mapState({
      snp500: state => state.snp500.snp500,
      apeStocks: state => state.apeWisdom.apeStocks,
      GICS: state => state.snp500.GICS,
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
      return result
    },
  },

  async created() {
    await this.fetchData();
    this.dataLoaded = true;
  }
}
</script>

<style scoped>

</style>