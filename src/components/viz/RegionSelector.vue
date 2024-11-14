<script setup>
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
import {availableRegions, availableTechs} from "src/config/constants";

const kpiStore = useKpiStore();
const {selectedRegion} = storeToRefs(kpiStore);
</script>

<template>
  <q-select
    v-model="selectedRegion"
    :options="availableRegions"
    filled
    style="border: 2px solid #6a6af1;"
    label="Select Region"
    class="q-ma-xs"
  />
</template>

<style scoped>

</style>
