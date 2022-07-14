<template>
  <el-container class="home">
    <el-main>
      <el-row :gutter="20">
        <el-col :sm="24" :lg="16">      
          <TreeMap />
        </el-col>
        <el-col :sm="24" :lg="8">
          <StockList />
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
  methods: {
    ...mapActions({
      fetchSnp500: 'snp500/fetchSnp500',
      fetchApeStocks: 'apeWisdom/fetchStocks',
    }),
    async fetchData() {
      await this.fetchSnp500();
      await this.fetchApeStocks();
    },
  },

  async created() {
    await this.fetchData();
  }
}
</script>

<style scoped>

</style>