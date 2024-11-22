<template>
  <router-link
    clickable
    :to="props.link"
    style="width:100%;  "
  >
    <q-item >
      <q-item-section
        v-if="props.icon"
        avatar
      >
        <q-icon :name="props.icon"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
<!--        <q-item-label caption>{{ props.caption }}</q-item-label>-->
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script setup>
import {ref} from "vue";

defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>

</style>
