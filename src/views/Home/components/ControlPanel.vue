<template>
  <el-form :inline="true">
    <el-form-item label="Units">
      <el-radio-group v-model="units" size="default">
        <el-radio-button label="mentions">Mentions</el-radio-button>
        <el-radio-button label="upvotes">Upvotes</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Threshold">
      <el-input-number
        size="default"
        v-model="threshold"
        :min="0"
        :precision="0"
        :step="1"
      />
    </el-form-item>
    <el-form-item label="Show stock list" class="list-toggle">
      <el-switch
        v-model="listToggle"
        size="large"
        class="mt-2"
        inline-prompt
        :active-icon="View"
        :inactive-icon="Hide"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
  import { View, Hide } from '@element-plus/icons-vue'
</script>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'ControlPanel',
  methods: {
    ...mapActions({
      toggleList: 'home/toggleList'
    }),
  },
  computed: {
    listToggle: {
      get () {
        return this.$store.state.home.listToggle;
      },
      set () {
        this.$store.commit('home/toggleList');
      }
    },
    threshold: {
      get () {
        return this.$store.state.treeMap.threshold;
      },
      set (num) {
        this.$store.commit('treeMap/setThreshold', num);
      }
    },
    units: {
      get () {
        return this.$store.state.treeMap.units;
      },
      set (unit) {
        this.$store.commit('treeMap/setUnits', unit)
      }
    }
  },
};
</script>

<style scoped>
.list-toggle {
  align-items: center;
}
</style>