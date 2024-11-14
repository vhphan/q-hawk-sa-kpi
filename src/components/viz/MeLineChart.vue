<script setup>
import { ref, computed, watch } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, TitleComponent } from "echarts/components";
import VChart from "vue-echarts";
import 'echarts/theme/dark';
import 'echarts/theme/inspired';

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent]);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  seriesName: {
    type: String,
    default: '',
  },
  timeUnit: {
    type: String,
    default: 'daily',
  },
  theme: {
    type: String,
    default: 'dark',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '400px',
  },
});

const chartRef = ref(null);

const getSeries = () => {
  if (!props.data || !props.data.map) {
    return [];
  }

  const sortedData = props.data.map(item => [new Date(item[0]), item[1]]).sort((a, b) => a[0] - b[0]);

  return [{
    data: sortedData,
    type: 'line',
    name: props.seriesName || 'Series',
  }];
};

const getOption = () => ({
  title: {
    text: props.seriesName || 'Series',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: getSeries(),
});

const chartOption = computed(() => getOption());

</script>

<template>
  <v-chart :option="chartOption" :theme="props.theme" ref="chartRef"
   :style="{height: props.height}"
  />
</template>
