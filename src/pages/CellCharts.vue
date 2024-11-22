<script setup>

import CellSelector from "components/viz/CellSelector.vue";
import {computed, ref} from "vue";
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
import ReloadData from "components/ReloadData.vue";
import MeLineChart from "components/viz/MeLineChart.vue";

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
});

const kpis = computed(() => Object.keys(kpiFromStore.value[0] || []).filter(kpi => kpi !== 'mno'));

const kpiFromStore = computed(() => {
  if (props.timeUnit === 'hourly') {
    return props.kpiType === 'standard' ? kpiStore.standardKpiHourly : kpiStore.flexKpiHourly;
  }
  return props.kpiType === 'standard' ? kpiStore.standardKpi : kpiStore.flexKpi;
});


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
        :level="'cell'"
      />
    </div>

    <div class="row">{{ selectedCell }}</div>
    <div v-for="kpi in kpis" :key="`kpi-${kpi}-timeUnit-${props.timeUnit}`" class="row">
      {{ kpi }}
      <me-line-chart
        :data="kpiFromStore.value[0][kpi]"
        :timeUnit="props.timeUnit"
      />


    </div>
  </div>

</template>

<style scoped>

</style>
