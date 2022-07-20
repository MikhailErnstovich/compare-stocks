<template>
  <el-container class="home">
    <el-header>
      <HeaderNav :activeIndex="'1'"/>
    </el-header>
    <el-container class="main-container">
      <el-header height="auto" class="main-header">
        <ControlPanel />
      </el-header>
      <el-main class="chart-container">
        <TreeMap />
      </el-main>
      <el-aside
        class="side-container"
        :class="listToggle ? '' : 'side-container_hidden'"
      >
        <el-row>
          <el-col :span="24">
            <el-switch
              v-model="listToggle"
              size="large"
              class="mt-2"
              style="margin-left: 24px"
              inline-prompt
              :active-icon="View"
              :inactive-icon="Hide"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <StockList />
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
  import { View, Hide } from '@element-plus/icons-vue'
</script>

<script>
import TreeMap from "./components/TreeMap.vue";
import StockList from "./components/StockList.vue";
import HeaderNav from "@components/HeaderNav.vue";
import ControlPanel from "./components/ControlPanel.vue";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: { TreeMap, StockList, HeaderNav, ControlPanel },
  data() {
    return {
      value: false,
    };
  },
  methods: {
    ...mapActions({
      fetchSnp500: "snp500/fetchSnp500",
      fetchApeStocks: "apeWisdom/fetchStocks",
      toggleList: "home/toggleList",
    }),
    async fetchData() {
      await this.fetchSnp500();
      await this.fetchApeStocks();
    },
  },
  computed: {
    ...mapState({
      snp500Loaded: state => state.snp500.dataLoaded,
      apeStocksLoaded: state => state.apeWisdom.dataLoaded,
    }),
    listToggle: {
      get() {
        return this.$store.state.home.listToggle;
      },
      set() {
        this.$store.commit("home/toggleList");
      },
    },
  },
  async created() {
    if (!this.snp500Loaded) {
      await this.fetchSnp500();
    }
    if (!this.apeStocksLoaded) {
      await this.fetchApeStocks();
    }
  },
};
</script>

<style scoped lang="scss">
.main-container {
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden !important;
}
.side-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  transform: translateX(1%);
  z-index: 2;
  background: #ffffff;
  box-shadow: -4px 4px 4px 0px #223c5033, -4px -4px 4px 0px #223c5033;
  transition: transform 0.5s ease-in-out;
  &_hidden {
    transform: translateX(110%);
  }
}
.chart-container {
  padding-top: 0;
}
.main-header {
  padding: 20px;
}
</style>