import {defineStore} from "pinia";
import {api} from "src/plugins/http";
import {endPoints} from "src/config/endPoints";
import {useLocalStorage} from "@vueuse/core";
import {mobileOperators} from "src/config/constants";

export const useKpiStore = defineStore("kpi", {
  state: () => ({
    standardKpi: {},
    flexKpi: {},
    standardKpiCells: {},
    flexKpiCells: {},

    standardKpiHourly: {},
    flexKpiHourly: {},
    standardKpiCellsHourly: {},
    flexKpiCellsHourly: {},


    selectedTech: 'nr',
    selectedRegion: 'ALL',
    selectedCell: '',
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
      const {data, error, status} = await api().get(endPoints.daily.standardKpi.regions);
      if (error || status !== 200) return;
      this.standardKpi = data.data;
    },

    async getRegionsFlexKpi() {
      const {data, error, status} = await api().get(endPoints.daily.flexKpi.regions);
      if (error || status !== 200) return;
      this.flexKpi = data.data;
    },

    async getRegionsStandardKpiHourly() {
      const {data, error, status} = await api().get(endPoints.hourly.standardKpi.regions);
      if (error || status !== 200) return;
      this.standardKpiHourly = data.data;
    },

    async getRegionsFlexKpiHourly() {
      const {data, error, status} = await api().get(endPoints.hourly.flexKpi.regions);
      if (error || status !== 200) return;
      this.flexKpiHourly = data.data;
    },

    async getCellsStandardKpi() {
      const {data, error, status} = await api().post(endPoints.daily.standardKpi.cells, {
          cells: [this.selectedCell],
        }
      );
      if (error || status !== 200) return;
      this.standardKpiCells = data.data;
    },

    async getCellsFlexKpi() {
      const {data, error, status} = await api().post(endPoints.daily.flexKpi.cells, {
          cells: [this.selectedCell],
        }
      );
      if (error || status !== 200) return;
      this.flexKpiCells = data.data;
    },

    async getCellsStandardKpiHourly() {
      const {data, error, status} = await api().post(endPoints.hourly.standardKpi.cells, {
          cells: [this.selectedCell],
        }
      );
      if (error || status !== 200) return;
      this.standardKpiCellsHourly = data.data;
    },

    async getCellsFlexKpiHourly() {
      const {data, error, status} = await api().post(endPoints.hourly.flexKpi.cells, {
          cells: [this.selectedCell],
        }
      );
      if (error || status !== 200) return;
      this.flexKpiCellsHourly = data.data;
    },




  }
});
