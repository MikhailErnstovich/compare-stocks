<template>
   <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    class="main-nav"
    :router="true"
  >
    <el-menu-item index="1" route="/"> Home </el-menu-item>
    <el-menu-item index="2" route="/stock/:ticker"> Stock </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: ['activeIndex'],
  data() {
    return {
      urls: {
        "1": "/",
        "2": "/stock/:ticker",
      }
    }
  },
  methods: {
    navigate(ev) {
      console.log(ev.target)
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