<script setup>
const props = defineProps({

  height: {
    type: String,
    default: '300px',
  },
});
</script>

<template>
  <div :style="{ height: props.height}">
      <q-card
        bordered
        class="my-card text-white full-height "
        style="background: radial-gradient(circle, #35a2ff 0%, #b5d6f5 100%)"
        :style="{ height: props.height}"
      >
        <q-card-section class="content-center full-height  ">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center" >
                <q-icon name="info"/>
                No data available
              </q-item-label>
            </q-item-section>
          </q-item>

        </q-card-section>


      </q-card>
  </div>
</template>

<style scoped>
</style>
