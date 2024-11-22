<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <q-expansion-item label="Daily" icon="calendar_today" default-opened>
          <q-item v-for="link in dailyLinks" :key="link.title" indent>
            <EssentialLink v-bind="link" />
          </q-item>
        </q-expansion-item>
        <q-expansion-item label="Hourly" icon="schedule" default-opened>
          <q-item v-for="link in hourlyLinks" :key="link.title" indent>
            <EssentialLink v-bind="link" />
          </q-item>
        </q-expansion-item>
        <q-expansion-item label="Test" icon="schedule" default-opened>
          <q-item v-for="link in testLinks" :key="link.title" indent>
            <EssentialLink v-bind="link" />
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const dailyLinks = [
  {
    title: 'Region Standard',
    caption: '',
    icon: 'school',
    link: '/region-standard'
  },
  {
    title: 'Region Flex',
    caption: '',
    icon: 'school',
    link: '/region-flex'
  },
];

const hourlyLinks = [
  {
    title: 'Region Standard',
    caption: '',
    icon: 'school',
    link: '/region-standard-hourly'
  },
  {
    title: 'Region Flex',
    caption: '',
    icon: 'school',
    link: '/region-flex-hourly'
  },
];

const testLinks = [
  {
    title: 'Test',
    caption: '',
    icon: 'school',
    link: '/page-one'
  },
];


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
.router-link-active {
  background-color: #a2a2a2;
}

</style>
