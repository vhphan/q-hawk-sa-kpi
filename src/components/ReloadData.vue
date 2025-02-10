<script setup>
import {defineProps} from 'vue';
import {useKpiActions} from "src/composables/useKpiActions";

const props = defineProps({
  kpiType: {
    type: String,
    validator(value) {
      return ['standard', 'flex'].includes(value);
    }
  },
  timeUnit: {
    type: String,
    validator(value) {
      return ['daily', 'hourly'].includes(value);
    }
  },
  level: {
    type: String,
    default: 'region',
    validator(value) {
      return ['region', 'cell'].includes(value);
    }
  }
})

const {action} = useKpiActions(props);

const reload = async () => {
  await action.value();
};
</script>

<template>
  <q-btn
    icon="refresh"
    @click="reload"
    glossy
    color="primary"
    class="q-ma-xs"
  >
    <q-tooltip>
      Reload Data
    </q-tooltip>
  </q-btn>
</template>

<style scoped>

</style>
