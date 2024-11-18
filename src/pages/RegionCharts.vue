<script setup>
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
// import {availableTechs} from "src/config/constants";
import RegionSelector from "components/viz/RegionSelector.vue";
import {computed, ref, watch} from "vue";
import MeLineChart from "components/viz/MeLineChart.vue";
import MeLineChartMno from "components/viz/MeLineChartMno.vue";


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

const { selectedRegion} = storeToRefs(kpiStore);
const kpiFromStore = computed(() => props.kpiType === 'standard' ? kpiStore.standardKpi : kpiStore.flexKpi);

const kpis = computed(() => Object.keys(kpiFromStore.value[selectedRegion.value] || {}).filter(kpi => kpi !== 'mno'));
// const {selectedTech} = storeToRefs(kpiStore);

// const regionData = ref(kpiFromStore.value[selectedRegion.value] || {});
const regionData = computed(() => kpiFromStore.value[selectedRegion.value] || {});

watch(selectedRegion, () => {
  console.log(`Region changed to: ${selectedRegion.value}`);
  regionData.value = kpiFromStore.value[selectedRegion.value] || {};
});


</script>

<template>
  <div class="row">
    <RegionSelector class="col-12 col-sm-6 col-md-4"/>
  </div>
  <div class="row">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3"
      v-for="kpi in kpis" :key="kpi"
    >
      <span>{{ kpi }}</span>
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
