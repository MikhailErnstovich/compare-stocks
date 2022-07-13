<template>
  <div class="tree-map">
     <el-radio-group class="tree-map__controls" v-model="units" size="large">
      <el-radio-button label="mentions">Mentions</el-radio-button>
      <el-radio-button label="upvotes">Upvotes</el-radio-button>
    </el-radio-group>
    <div id="chartdiv" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TreeMap",
  props: ["stocks"],
  data() {
    return {
      units: "mentions",
      threshold: 5
    };
  },
  methods: {
    renderChart() {
      const rootChart = am5.Root.new(this.$refs.chartdiv);
      rootChart.setThemes([am5themes_Animated.new(rootChart)]);
      const chart = rootChart.container.children.push(
        am5.Container.new(rootChart, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: rootChart.verticalLayout,
        })
      );
      // Create series and set data
      const series = chart.children.push(
        am5hierarchy.Treemap.new(rootChart, {
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          initialDepth: 2,
          topDepth: 0,
          layoutAlgorithm: "squarify"
        })
      );

      series.rectangles.template.adapters.add("fill", function (fill, target) {
        const value = target.dataItem.get("value");

        if (value >= 100) {
          return am5.color(0xF53B3B);
        }
        if (value >= 80 && value < 100) {
          return am5.color(0xFFD512);
        }
        if (value >= 60 && value < 80) {
          return am5.color(0xEFF2B1);
        }
        if (value >= 40 && value < 60) {
          return am5.color(0xA1EDDE);
        }
        if (value >= 20 && value < 40) {
          return am5.color(0x4BDCE3);
        }
        if (value < 20) {
          return am5.color(0x4D93DD);
        }
      });

      series.rectangles.template.set("interactive", true);
      series.rectangles.template.states.create("hover", {
        fill: am5.color(0x000000),
        stroke: am5.color(0xffffff),
      });

      series.labels.template.setAll({
        fontSize: 20,
        fontWeight: 600,
        fill: am5.color(0xffffff),
        text: "{ticker}",
      });

      series.nodes.template.set(
        "tooltipText",
        "[bold]{name}[/]\nMentions: {sum}"
      );

      series.data.setAll([
        {
          name: "Reddit disease map",
          children: this.tree,
        },
      ]);

      this.rootChart = rootChart;
    },
  },
  computed: {
    ...mapState({
      GICS: (state) => state.snp500.GICS,
    }),
    tree() {
      const tree = this.GICS.reduce((acc, cur) => {
        acc.push({ name: cur, children: [] });
        return acc;
      }, []);
      this.stocks.forEach((stock) => {
        const treeItem = tree.find((el) => el.name === stock.GICS);
        if (treeItem && +stock.mentions > this.threshold) {
          treeItem.children.push({
            ticker: stock.ticker,
            name: stock.name,
            units: this.units,
            value: +stock[this.units],
          });
        }
      });
      return tree;
    },
  },
  
  mounted() {
    this.renderChart();
  },
  watch: {
    tree(next, old) {
      this.rootChart.dispose();
      this.renderChart()
    },
  },
  beforeUnmount() {
    if (this.rootChart) {
      this.rootChart.dispose();
    }
  },
};
</script>

<style lang='scss' scoped>
.tree-map {
  width: 100%;
  &__controls {
    display: block;
  }
  &__button {
    width: 200px;
  }
}
#chartdiv {
  width: 100%;
  height: 90vh;
}
</style>