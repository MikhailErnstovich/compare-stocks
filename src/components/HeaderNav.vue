<template>
   <el-menu
    :default-active="activeIndex"
    mode="horizontal"
  >
    <el-menu-item index="1">Chart 1</el-menu-item>
    <el-menu-item index="2">Chart 2</el-menu-item>
    <el-menu-item index="3">Chart 3</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>

<style>

</style>