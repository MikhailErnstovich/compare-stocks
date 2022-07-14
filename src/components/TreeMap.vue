<template>
  <div class="tree-map">
    <el-form :inline="true" class="tree-map__form">
      <el-form-item label="Units">
        <el-radio-group v-model="units" size="default">
          <el-radio-button label="mentions">Mentions</el-radio-button>
          <el-radio-button label="upvotes">Upvotes</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Threshold">
        <el-input-number size="default" v-model="threshold" :min="0" :precision="0" :step="1"/>
      </el-form-item>
    </el-form>
    <div id="chartdiv" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'TreeMap',
  data() {
    return {
      units: "mentions",
      threshold: 5
    };
  },
  computed: {
    ...mapState({
      snp500: state => state.snp500.snp500,
      apeStocks: state => state.apeWisdom.apeStocks,
      GICS: (state) => state.snp500.GICS,
    }),
    stocks() {
      const result = [];
      for(let i = 0; i < this.snp500.length; i ++) {
        const stock = this.apeStocks.find(el => el.ticker === this.snp500[i].ticker);
        if (stock) {
          stock.GICS = this.snp500[i].GICS;
          result.push(stock);
        }
      }
      return result;
    },
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
        `[bold]{name}[/]\n${this.units[0].toUpperCase() + this.units.slice(1)}: {sum}`
      );

      series.data.setAll([
        {
          name: "Reddit disease map",
          children: this.tree,
        },
      ]);
      this.series = series;
      this.rootChart = rootChart;
  },
  watch: {
    tree() {
      if (this.rootChart) {
        this.series.nodes.template.set(
          "tooltipText",
          `[bold]{name}[/]\n${this.units[0].toUpperCase() + this.units.slice(1)}: {sum}`
        );
        this.series.data.setAll([
          {
            name: "Reddit disease map",
            children: this.tree,
          },
        ]);
      }
    }
  },  
  beforeUnmount() {
    if (this.rootChart) {
      this.rootChart.dispose();
    }
  },
};
</script>

<style lang='scss' scoped>
#chartdiv {
  width: 100%;
  height: 90vh;
}
</style>