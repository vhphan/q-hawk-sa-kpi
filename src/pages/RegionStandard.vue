<script setup>
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";
// import {availableTechs} from "src/config/constants";
import RegionSelector from "components/viz/RegionSelector.vue";
import {computed} from "vue";
import MeLineChart from "components/viz/MeLineChart.vue";

const kpiStore = useKpiStore();
const {standardKpi, selectedRegion} = storeToRefs(kpiStore);

const kpis = computed(() => Object.keys(standardKpi.value[selectedRegion.value] || {}));
// const {selectedTech} = storeToRefs(kpiStore);

</script>

<template>
  <div class="row">
    <RegionSelector class="col-12 col-sm-6 col-md-4"/>
  </div>
  <div v-for="kpi in kpis" :key="kpi">
    <div>{{kpi}}</div>
<!--    <div>{{ standardKpi[selectedRegion][kpi] }}</div>-->
    <div>
      <q-card>
        <q-card-section>
<!--          <q-table-->
<!--            :rows="standardKpi[selectedRegion][kpi].map(([date, value]) => ({ date, value }))"-->
<!--            :columns="[-->
<!--              {name: 'date', label: 'Date', align: 'center', field: 'date'},-->
<!--              {name: 'value', label: 'Value', align: 'center', field: 'value'},-->
<!--            ]"-->
<!--          />-->
          <me-line-chart :data="standardKpi[selectedRegion][kpi]" :seriesName="kpi"/>
        </q-card-section>
      </q-card>
    </div>

  </div>

  <!--  <q-card>-->
  <!--    <q-tabs-->
  <!--      v-model="selectedTech"-->
  <!--      dense-->
  <!--      style="border: 1px solid #6a6af1;"-->
  <!--      active-color="primary"-->
  <!--      align="center"-->
  <!--      narrow-indicator-->
  <!--      active-class="bg-primary text-white"-->
  <!--      inline-label-->
  <!--    >-->
  <!--      <q-tab-->
  <!--        name="nr"-->
  <!--        label="NR"-->
  <!--        icon="5g"-->
  <!--        style="min-width: 15rem;"/>-->
  <!--      <q-tab-->
  <!--        name="lte"-->
  <!--        label="LTE"-->
  <!--        icon="4g_mobiledata"-->
  <!--        style="min-width: 15rem;"-->
  <!--      />-->
  <!--    </q-tabs>-->
  <!--    <q-separator/>-->
  <!--    <q-tab-panels v-model="selectedTech" animated>-->
  <!--      <q-tab-panel v-for="tech in availableTechs.map(d=>d.value)" :name="tech" :key="tech">-->
  <!--        <div class="row">-->


  <!--        </div>-->
  <!--      </q-tab-panel>-->
  <!--    </q-tab-panels>-->
  <!--  </q-card>-->

</template>

<style scoped>

</style>
