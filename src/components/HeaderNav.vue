<template>
   <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    class="main-nav"
    :router="true"
  >
    <el-menu-item index="1" route="/"> Home </el-menu-item>
    <el-menu-item index="2" :route="tickerPath"> Stock </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'HeaderNav',
  props: ['activeIndex'],
  computed: {
    ...mapGetters({
      tickers: 'snp500/getTickers'
    }),
    tickerPath() {
      return `/stock/${this.tickers[0]}`;
    }
  }
}
</script>

<style scoped lang="scss">
.main-nav {
  &__link {
    text-decoration: none;
    outline: none;
  }
}
</style>