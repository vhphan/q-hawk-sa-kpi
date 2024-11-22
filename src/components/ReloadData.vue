<script setup>
import {computed, defineProps} from 'vue';
import {useKpiStore} from "stores/kpiStore";

const props = defineProps({
  kpiType: {
    type: String,
    validator(value, props) {
      return ['standard', 'flex'].includes(value);
    }
  },
  timeUnit: {
    type: String,
    validator(value, props) {
      return ['daily', 'hourly'].includes(value);
    }
  },
  level: {
    type: String,
    default: 'region',
    validator(value, props) {
      return ['region', 'cell'].includes(value);
    }
  }
})

const kpiStore = useKpiStore();
const action = computed(() => {
  const {kpiType, timeUnit, level} = props;
  if (level === 'cell') {
    const actions = {
      standard: {
        daily: kpiStore.getCellsStandardKpi,
        hourly: kpiStore.getCellsStandardKpiHourly,
      },
      flex: {
        daily: kpiStore.getCellsFlexKpi,
        hourly: kpiStore.getCellsFlexKpiHourly,
      },
    };

    if (actions[kpiType] && actions[kpiType][timeUnit]) {
      return actions[kpiType][timeUnit];
    } else {
      throw new Error('Invalid kpiType or timeUnit');
    }
  }

  if (level === 'region') {
    const actions = {
      standard: {
        daily: kpiStore.getRegionsStandardKpi,
        hourly: kpiStore.getRegionsStandardKpiHourly,
      },
      flex: {
        daily: kpiStore.getRegionsFlexKpi,
        hourly: kpiStore.getRegionsFlexKpiHourly,
      },
    };

    if (actions[kpiType] && actions[kpiType][timeUnit]) {
      return actions[kpiType][timeUnit];
    } else {
      throw new Error('Invalid kpiType or timeUnit');
    }
  }

  throw new Error(`Invalid level: ${level}`);
});

const reload = async () => {
  await action.value();
}

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
