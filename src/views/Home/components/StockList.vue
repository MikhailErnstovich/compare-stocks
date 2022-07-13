<template>
  <el-table :data="stocks" style="width: 100%">
    <el-table-column prop="ticker" label="Ticker" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="mentions" label="Mentions" />
    <el-table-column prop="upvotes" label="Upvotes" />
  </el-table>
</template>

<script>

export default {
  name: 'StockList',
  props: ['stocks']
}
</script>

<style lang='scss' scoped>
  .stock-list {
    &__header {
      font-weight: bold;
    }
    &__header,
    &__item {
      display: flex;
      height: 1.5em;
      span{
        display: block;
        text-overflow: ellipsis;
        &:first-child,
        &:nth-child(2) {
          width: 10%;
        }
        &:nth-child(3) {
          width: 40%;
        }
        &:nth-child(4),
        &:nth-child(5) {
          width: 20%;
        }
      }
    }
  }
</style>