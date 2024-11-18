import {defineStore} from "pinia";
import {api} from "src/plugins/http";
import {endPoints} from "src/config/endPoints";
import {useLocalStorage} from "@vueuse/core";
import {mobileOperators} from "src/config/constants";

export const useKpiStore = defineStore("kpi", {
  state: () => ({
    standardKpi: {},
    flexKpi: {},
    selectedTech: 'nr',
    selectedRegion: 'ALL',
    colorMapping: useLocalStorage('colorMapping', {
      'Maxis': '#72fa05',
      'Celcom': '#37ffd4',
      'Digi': '#fff408',
      'Umobile': '#ffa600',
      'YTL': '#795E61',
      'TM': '#ff00ff',
      'DNB': '#4992ff',
    }),
    selectedOperators: mobileOperators,

  }),
  actions: {
    async getRegionsStandardKpi() {
      const results = await api().get(endPoints.standardKpi.regions);
      if (results.error || !results.status === 200) {
        return;
      }
      this.standardKpi = results.data.data;
    },
    async getRegionsFlexKpi() {
      const results = await api().get(endPoints.flexKpi.regions);
      if (results.error || !results.status === 200) {
        return;
      }
      this.flexKpi = results.data.data;
    },


  }
});
