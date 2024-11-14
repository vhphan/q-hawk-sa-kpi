import {defineStore} from "pinia";
import {api} from "src/plugins/http";
import {endPoints} from "src/config/endPoints";

export const useKpiStore = defineStore("kpi", {
  state: () => ({
    standardKpi: {},
    flexKpi: {},
    selectedTech: 'nr',
    selectedRegion: 'ALL',
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
