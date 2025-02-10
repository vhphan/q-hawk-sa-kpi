<script setup>
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
import {availableBands} from "src/config/constants";

const kpiStore = useKpiStore();
const {selectedBand} = storeToRefs(kpiStore);
</script>

<template>
  <q-select
    v-model="selectedBand"
    :options="availableBands"
    filled
    style="border: 2px solid #6a6af1;"
    label="Select Band"
    class="q-ma-xs"
  />
</template>

<style scoped>

</style>
