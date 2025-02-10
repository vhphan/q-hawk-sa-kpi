<template>
  <router-view/>
</template>

<script setup>
import 'src/monkeyPatch';
import {onMounted} from "vue";
import {useKpiStore} from "stores/kpiStore";

defineOptions({
  name: 'App'
});

const kpiStore = useKpiStore();

onMounted(async () => {
  console.log('App mounted');
  await Promise.all([
    kpiStore.getRegionsStandardKpi(),
    kpiStore.getRegionsFlexKpi(),
    kpiStore.getRegionsStandardKpiHourly(),
    kpiStore.getRegionsFlexKpiHourly(),

    kpiStore.getRegionsStandardKpiByBand(),
    kpiStore.getRegionsFlexKpiByBand(),
    kpiStore.getRegionsStandardKpiHourlyByBand(),
    kpiStore.getRegionsFlexKpiHourlyByBand(),


  ]);
});

</script>
