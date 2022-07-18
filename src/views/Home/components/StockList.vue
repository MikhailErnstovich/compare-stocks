<template>
  <el-table style="width: 100%"
    :data="stocks" 
    :default-sort="{ prop: 'mentions', order: 'descending' }"
    stripe
    height="95vh"
  >
    <el-table-column type="index" />
    <el-table-column prop="ticker" label="Ticker" sortable />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="GICS" label="GICS" sortable />
    <el-table-column prop="mentions" label="Mentions" sortable />
    <el-table-column prop="upvotes" label="Upvotes" sortable />
  </el-table>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'StockList',
  data() {
    return {
      sortParam: 'mentions',
    }
  },
  computed: {
    ...mapState({
      snp500: state => state.snp500.snp500,
      apeStocks: state => state.apeWisdom.apeStocks,
    }),
    stocks() {
      const result = [];
      for(let i = 0; i < this.snp500.length; i ++) {
        const stock = this.apeStocks.find(el => el.ticker === this.snp500[i].ticker);
        if (stock) {
          stock.GICS = this.snp500[i].GICS;
          stock.mentions = +stock.mentions;
          stock.upvotes = +stock.upvotes;
          result.push(stock);
        }
      }
      return result
    },
  },
}
</script>

<style lang='scss' scoped>

</style>