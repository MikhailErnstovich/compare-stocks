<template>
  <div id="chartdiv" ref="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "TreeMap",
  props: ['stocks'],
  mounted() {
    const root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Create series and set data
    const series = container.children.push(
      am5hierarchy.Treemap.new(root, {
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        initialDepth: 2,
      })
    );

    series.data.setAll([
      {
        name: "Reddit disease map",
        children: this.stocks,
      },
    ]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Add breadcrumbs
    container.children.unshift(
      am5hierarchy.BreadcrumbBar.new(root, {
        series: series,
      })
    );
  },
  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>