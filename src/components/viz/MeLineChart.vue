<script setup>
import {computed, ref, watch} from "vue";
import {connect, use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import {DataZoomComponent, GridComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart from "vue-echarts";
import 'echarts/theme/dark-bold';
import 'echarts/theme/dark-digerati';
import 'echarts/theme/dark-fresh-cut';
import 'echarts/theme/inspired';
import {yAxisLabelFormatter} from "components/viz/utils";
import {timeZone} from "src/config/constants";

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent, DataZoomComponent]);

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
    default: 'dark-fresh-cut',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '300px',
  },
  chartKey: {
    type: String,
    default: '',
  },
  connectName: {
    type: String,
    default: '',
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

const getOption = () => {
  const result = ({
      title: {
        text: props.seriesName || 'Series',
      },

      xAxis: {
        type: 'time',
      },
      yAxis: {
        splitLine: {show: false},
        type: 'value',
        scale: true,
        name: '',
        // nameLocation: 'middle',
        axisLabel: {
          inside: false,
          formatter: (value) => yAxisLabelFormatter(value)
        },
      },
      series: getSeries(),
      dataZoom: [
        // {
        //   type: 'slider',
        //   show: true,
        //   start: 0,
        //   end: 100,
        // }
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
          start:50,
          end:100
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            // formatter: 'format2',
            backgroundColor: '#160170',

          },
        },
        formatter: (params) => {
          //Math.round(kpiValue * 100) / 100
          return `${Math.round(params[0].value[1] * 100) / 100}`;
        },
      },
    }
  )
  if (props.timeUnit === 'daily') {
    result.tooltip.axisPointer.label = {
      ...result.tooltip.axisPointer.label,
      formatter: function (params) {
        if (params.axisDimension === 'x') {
          const date = new Date(params.value);
          return `${date.toISOString().slice(0, 10)}`;
        }
        return yAxisLabelFormatter(params.value);
      }
    };
  }
  return result;
};

const chartOption = computed(() => getOption());

watch(chartRef, (newVal) => {
  if (!chartRef.value) return;
  connect(props.connectName || props.timeUnit);

}, {immediate: true});

// watch(props.data, () => {
//   if (!chartRef.value) return;
//   chartRef.value.setOption(getOption());
// }, {deep: true});

</script>

<template>
  <v-chart :option="chartOption" :theme="props.theme" ref="chartRef"
           :style="{height: props.height}"
           autoresize
           :group="props.connectName || props.timeUnit"
  />
</template>
