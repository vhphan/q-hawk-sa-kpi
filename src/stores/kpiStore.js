import {defineStore} from "pinia";
import {api} from "src/plugins/http";
import {endPoints} from "src/config/endPoints";
import {useLocalStorage} from "@vueuse/core";
import {mobileOperators} from "src/config/constants";
import {getResultsAllBands, reduceResults} from "stores/utils";

export const useKpiStore = defineStore("kpi", {
  state: () => ({

    standardKpi: {},
    flexKpi: {},

    standardKpiByBand: {},
    flexKpiByBand: {},

    standardKpiHourly: {},
    flexKpiHourly: {},

    standardKpiHourlyByBand: {},
    flexKpiHourlyByBand: {},

    standardKpiCell: {},
    standardKpiCellMeta: {},
    flexKpiCell: {},
    flexKpiCellMeta: {},

    standardKpiCells: {},
    standardKpiCellsMeta: {},
    flexKpiCells: {},
    flexKpiCellsMeta: {},


    standardKpiCellHourly: {},
    standardKpiCellHourlyMeta: {},
    flexKpiCellHourly: {},
    flexKpiCellHourlyMeta: {},

    standardKpiCellsHourly: {},
    standardKpiCellsHourlyMeta: {},
    flexKpiCellsHourly: {},
    flexKpiCellsHourlyMeta: {},


    selectedTech: 'nr',
    selectedRegion: useLocalStorage('selectedRegion', 'ALL'),
    selectedCell: useLocalStorage('selectedCell', {}),
    selectedCells: useLocalStorage('selectedCells', []),
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
    // selectedBand: useLocalStorage('selectedBand', 'ALL'),
    selectedBand: 'ALL',

  }),
  actions: {

    async getRegionsStandardKpi() {
      const {data, error, status} = await api().get(endPoints.daily.standardKpi.regions);
      if (!error && status === 200) {
        this.standardKpi = data.data;
      }
    },

    async getRegionsFlexKpi() {
      const {data, error, status} = await api().get(endPoints.daily.flexKpi.regions);
      if (!error && status === 200) {
        this.flexKpi = data.data;
      }
    },

    async getRegionsStandardKpiHourly() {
      const {data, error, status} = await api().get(endPoints.hourly.standardKpi.regions, {band: 'N3'});
      if (!error && status === 200) {
        this.standardKpiHourly = data.data;
      }
    },

    async getRegionsFlexKpiHourly() {
      const {data, error, status} = await api().get(endPoints.hourly.flexKpi.regions);
      if (!error && status === 200) {
        this.flexKpiHourly = data.data;
      }
    },


    async getRegionsStandardKpiByBand() {
      const url = endPoints.daily.standardKpi.regions;
      const results = await getResultsAllBands(url);
      this.standardKpiByBand = reduceResults(results);
    },

    async getRegionsFlexKpiByBand() {
      const url = endPoints.daily.flexKpi.regions;
      const results = await getResultsAllBands(url);
      this.flexKpiByBand = reduceResults(results);
    },


    async getRegionsStandardKpiHourlyByBand() {
      const url = endPoints.hourly.standardKpi.regions;
      const results = await getResultsAllBands(url);
      this.standardKpiHourlyByBand = reduceResults(results);
    },

    async getRegionsFlexKpiHourlyByBand() {
      const url = endPoints.hourly.flexKpi.regions;
      const results = await getResultsAllBands(url);
      this.flexKpiHourlyByBand = reduceResults(results);
    },


    async getCellsStandardKpi(singleCell) {
      const cells = singleCell ? [this.selectedCell] : this.selectedCells;
      const {data, error, status} = await api().post(endPoints.daily.standardKpi.cells, {
          cells: cells.map(cell => cell.value),
        }
      );
      if (error || status !== 200) return;
      this[singleCell ? 'standardKpiCell' : 'standardKpiCells'] = data.data;
      this[singleCell ? 'standardKpiCellMeta' : 'standardKpiCellsMeta'] = data.meta;
    },

    async getCellsFlexKpi(singleCell) {
      const cells = singleCell ? [this.selectedCell] : this.selectedCells;
      const {data, error, status} = await api().post(endPoints.daily.flexKpi.cells, {
          cells: cells.map(cell => cell.value),
        }
      );
      if (error || status !== 200) return;
      this[singleCell ? 'flexKpiCell' : 'flexKpiCells'] = data.data;
      this[singleCell ? 'flexKpiCellMeta' : 'flexKpiCellsMeta'] = data.meta;
    },

    async getCellsStandardKpiHourly(singleCell) {
      const cells = singleCell ? [this.selectedCell] : this.selectedCells;
      const {data, error, status} = await api().post(endPoints.hourly.standardKpi.cells, {
          cells: cells.map(cell => cell.value),
        }
      );
      if (error || status !== 200) return;
      this[singleCell ? 'standardKpiCellHourly' : 'standardKpiCellsHourly'] = data.data;
      this[singleCell ? 'standardKpiCellHourlyMeta' : 'standardKpiCellsHourlyMeta'] = data.meta;
    },

    async getCellsFlexKpiHourly(singleCell) {
      const cells = singleCell ? [this.selectedCell] : this.selectedCells;
      const {data, error, status} = await api().post(endPoints.hourly.flexKpi.cells, {
          cells: cells.map(cell => cell.value),
        }
      );
      if (error || status !== 200) return;
      this[singleCell ? 'flexKpiCellHourly' : 'flexKpiCellsHourly'] = data.data;
      this[singleCell ? 'flexKpiCellHourlyMeta' : 'flexKpiCellsHourlyMeta'] = data.meta;
    },

  }
});
