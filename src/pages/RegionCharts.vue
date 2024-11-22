<script setup>
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
import RegionSelector from "components/viz/RegionSelector.vue";
import {computed, ref, watch} from "vue";
import MeLineChart from "components/viz/MeLineChart.vue";
import MeLineChartMno from "components/viz/MeLineChartMno.vue";
import MnoSelector from "components/viz/MnoSelector.vue";
import ReloadData from "components/ReloadData.vue";


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

const kpiStore = useKpiStore();

const {selectedRegion} = storeToRefs(kpiStore);

const kpiFromStore = computed(() => {
  if (props.timeUnit === 'hourly') {
    return props.kpiType === 'standard' ? kpiStore.standardKpiHourly : kpiStore.flexKpiHourly;
  }
  return props.kpiType === 'standard' ? kpiStore.standardKpi : kpiStore.flexKpi;
});

const kpis = computed(() => Object.keys(kpiFromStore.value[selectedRegion.value] || {}).filter(kpi => kpi !== 'mno'));
// const {selectedTech} = storeToRefs(kpiStore);

// const regionData = ref(kpiFromStore.value[selectedRegion.value] || {});
const regionData = computed(() => kpiFromStore.value[selectedRegion.value] || {});

// watch(selectedRegion, () => {
//   console.log(`Region changed to: ${selectedRegion.value}`);
//   regionData.value = kpiFromStore.value[selectedRegion.value] || {};
// });


</script>

<template>
  <div class="row">
    <RegionSelector
      class="col-12 col-sm-5 col-md-5"
    />
    <mno-selector
      class="col-12 col-sm-5 col-md-5"
      v-if="props.kpiType === 'flex'"
    />
    <reload-data
      class="col-12 col-sm-2 col-md-1"
      :kpiType="props.kpiType"
      :timeUnit="props.timeUnit"
    />
  </div>
  <div class="row">
    <div
      class="col-12 col-sm-6 col-md-6 col-lg-4"
      v-for="kpi in kpis" :key="`kpi-${kpi}-timeUnit-${props.timeUnit}`"
    >
      <q-card
        bordered
        class="bg-blue-11 text-whit q-pa-xs-xs"
      >
        <me-line-chart
          v-if="props.kpiType === 'standard'"
          :data="regionData[kpi] || []"
          :seriesName="kpi"
          :time-unit="props.timeUnit"
        />
        <me-line-chart-mno
          v-else
          :data="regionData[kpi] || {}"
          :seriesName="kpi"
          :time-unit="props.timeUnit"
        />
      </q-card>
    </div>
  </div>


</template>

<style scoped>

</style>
