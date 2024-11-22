<script setup>

import {mobileOperators} from "src/config/constants";
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";

const kpiStore = useKpiStore();
const {selectedOperators} = storeToRefs(kpiStore);

</script>

<template>
  <div>
    <q-select
      v-model="selectedOperators"
      :options="mobileOperators"
      label="Select MNO"
      filled
      class="q-ma-xs"
      use-chips
      multiple
      emit-value
      map-options
      option-value="value"
      option-label="label"
      color="primary"
      style="border: 2px solid #6a6af1;"

    />
  </div>
</template>

<style scoped>

</style>
