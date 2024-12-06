import {computed} from 'vue';
import {useKpiStore} from 'stores/kpiStore';

export function useKpiActions(props) {
  const kpiStore = useKpiStore();

  const action = computed(() => {
    const {kpiType, timeUnit, level} = props;

    if (level === 'cell' || level === 'cells') {
      const isSingleCell = level === 'cell';
      const actions = {
        standard: {
          daily: () => kpiStore.getCellsStandardKpi(isSingleCell),
          hourly: () => kpiStore.getCellsStandardKpiHourly(isSingleCell),
        },
        flex: {
          daily: () => kpiStore.getCellsFlexKpi(isSingleCell),
          hourly: () => kpiStore.getCellsFlexKpiHourly(isSingleCell),
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

  return {
    action,
  };
}
