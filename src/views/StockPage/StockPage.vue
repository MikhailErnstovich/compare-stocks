<template>
    <el-container>
      <el-header>
        <HeaderNav :activeIndex="'2'"/>
      </el-header>
      <el-main>{{ stock }}</el-main>
    </el-container>
</template>

<script>
import HeaderNav from "@components/HeaderNav.vue";
export default {
  name: 'Stock',
  components:  { HeaderNav },
  computed: {
    stock() {
      return this.$route.params.ticker
    }
  }
}
</script>

<style>

</style>