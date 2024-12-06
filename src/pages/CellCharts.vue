<script setup>

import CellSelector from "components/viz/CellSelector.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
import ReloadData from "components/ReloadData.vue";
import MeLineChart from "components/viz/MeLineChart.vue";
import NoData from "components/viz/NoData.vue";
import MeLineChartMno from "components/viz/MeLineChartMno.vue";
import {useKpiActions} from "src/composables/useKpiActions";

const kpiStore = useKpiStore();

const {selectedCell} = storeToRefs(kpiStore);
const props = defineProps({
  timeUnit: {
    type: String,
    default: 'daily',
  },
  kpiType: {
    type: String,
    default: 'standard',
  },
  level: {
    type: String,
    default: 'cell',
    validator(value) {
      return ['cell', 'cells'].includes(value);
    }
  }
});

const kpiFromStore = computed(() => {
  if (props.timeUnit === 'hourly') {
    return props.kpiType === 'standard' ? kpiStore.standardKpiCellHourly : kpiStore.flexKpiCellHourly;
  }
  return props.kpiType === 'standard' ? kpiStore.standardKpiCell : kpiStore.flexKpiCell;
});

const kpiMetaFromStore = computed(() => {
  if (props.timeUnit === 'hourly') {
    return props.kpiType === 'standard' ? kpiStore.standardKpiCellHourlyMeta : kpiStore.flexKpiCellHourlyMeta;
  }
  return props.kpiType === 'standard' ? kpiStore.standardKpiCellMeta : kpiStore.flexKpiCellMeta;
});

const kpis = computed(() => Object.keys(kpiFromStore.value || {}).filter(kpi => kpi !== 'mno'));

const isNoData = computed(() => kpis.value.length === 0);

const {action} = useKpiActions(props);

watch(selectedCell, async () => {
  await action.value();
});


async function refreshData() {
  if (!selectedCell.value) {
    return;
  }
  if (kpiMetaFromStore.value.cells && kpiMetaFromStore.value.cells.includes(selectedCell.value.value)) {
    return;
  }
  await action.value();
}


watch(() => [props.timeUnit, props.kpiType, props.level], async () => {
  await refreshData();
}, {immediate: true});

</script>

<template>
  <div>

    <div class="row" style="background-color: lightcyan;">
      <cell-selector
        v-model:selectedCell="selectedCell"
        class="col-12 col-sm-6 col-md-5"
      />
      <reload-data
        class="col-12 col-sm-2 col-md-1"
        :kpiType="props.kpiType"
        :timeUnit="props.timeUnit"
        level="cell"
      />

      <q-item>
        <strong>KPI Metadata:</strong>
        {{ kpiMetaFromStore }}
      </q-item>
    </div>

    <div class="row" v-if="isNoData">
      <no-data
        class="col-12 col-sm-6 col-md-6 col-lg-4"
        v-for="i in 10" :key="`no-data-${i}`"
      />
    </div>

    <div v-else class="row">
      <div
        class="col-12 col-sm-6 col-md-6 col-lg-4"
        v-for="kpi in kpis" :key="`kpi-${kpi}-timeUnit-${props.timeUnit}`">
        <me-line-chart
          v-if="props.kpiType === 'standard'"
          :data="kpiFromStore[kpi]"
          :timeUnit="props.timeUnit"
          :seriesName="kpi"
        />
        <me-line-chart-mno
          v-else
          :data="kpiFromStore[kpi]"
          :timeUnit="props.timeUnit"
          :seriesName="kpi"
        />
      </div>


    </div>
  </div>

</template>

<style scoped>

</style>
