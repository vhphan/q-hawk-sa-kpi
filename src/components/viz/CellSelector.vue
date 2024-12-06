<script setup>

import {ref, watch} from "vue";
import {endPoints} from "src/config/endPoints";
import {api} from "src/plugins/http";
import {debounce} from "quasar";
import {triggerWarning} from "src/plugins/notify";
import {useKpiStore} from "stores/kpiStore";
import {storeToRefs} from "pinia";

const kpiStore = useKpiStore();
const cellPartial = ref('');
const cellsList = ref([]);
const {selectedCell} = storeToRefs(kpiStore);
const localSelectedCell = ref(selectedCell.value);
const pageNumber = ref(1);


const getCellsListFromBackend = async (append = false) => {
  try {
    const {data, error, status} = await api().get(endPoints.cells(cellPartial.value, pageNumber.value));
    if (append) {
      cellsList.value = [...cellsList.value, ...data.data];
      return;
    }
    cellsList.value = data.data;
  } catch (error) {
    console.error('Error fetching cells list:', error);
    triggerWarning({
      message: 'Failed to fetch cells list',
      timeout: 2000,
    });
  }
};

const filterFn = debounce(async function (val, update, abort) {
  console.log(val);
  update(async () => {
    if (val.length < 5) {
      triggerWarning(
        {
          message: 'Please input at least 5 characters',
          timeout: 2000,
        }
      )
      return;
    }

    cellPartial.value = val;
    await getCellsListFromBackend();

    if (cellsList.value.length === 0) {
      triggerWarning(
        {
          message: `No results found for ${val}`,
          timeout: 2000,
        }
      )
    }

  });


}, 500);

const loadMoreCells = async () => {
  pageNumber.value += 1;
  await getCellsListFromBackend(true);
};

const emit = defineEmits(['update:selectedCell']);
watch(selectedCell, (newValue) => {
  emit('update:selectedCell', newValue);
});

watch (localSelectedCell, (newValue) => {
  selectedCell.value = newValue;
});

</script>
<template>
  <div class="flex flex-center">
    <q-select
      use-input
      filled
      v-model="localSelectedCell"
      label="Key in cell id"
      :options="cellsList"
      style="min-width: 250px; border: solid 2px blue;"
      @filter="filterFn"
      input-class="custom-input"
      input-style="background-color: lightyellow; border: 1px dashed blue;"
    >
      <template v-slot:before>
        <q-icon name="cell_tower"/>
        <span style="font-size: 1rem;">Cell:</span>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:after-options>
        <q-item clickable @click="loadMoreCells">
          <q-item-section class="text-primary">
            Load more
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:selected-item="scope">
        <q-chip
          :label="scope.opt.label"
          style="background-color: lightblue; border: 1px dashed blue;"
        />
      </template>
    </q-select>
  </div>
</template>

<style scoped>
.custom-input {
  background-color: lightyellow;
}
</style>
