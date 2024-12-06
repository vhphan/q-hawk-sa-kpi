<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated
:style="{
  backgroundColor: isDevMode ? 'var(--q-negative)' : 'var(--q-primary)',
}"
    >
      <q-toolbar
      >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SA KPI Dashboard
        </q-toolbar-title>

        <div>v{{version}}</div>
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
        <q-expansion-item label="Test" icon="schedule" default-opened
            v-if="isDevMode"
        >
          <q-item
            v-for="link in testLinks" :key="link.title" indent>
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
import {ref} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import packageJson from '../../package.json';
const version = packageJson.version;
defineOptions({
  name: 'MainLayout'
});

const isDevMode = import.meta.env.DEV;

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
  // {
  //   title: 'Cell Standard',
  //   caption: '',
  //   icon: 'school',
  //   link: '/cell-standard'
  // },
  // {
  //   title: 'Cell Flex',
  //   caption: '',
  //   icon: 'school',
  //   link: '/cell-flex'
  // },
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
  {
    title: 'Cell Standard',
    caption: '',
    icon: 'school',
    link: '/cell-standard-hourly'
  },
  {
    title: 'Cell Flex',
    caption: '',
    icon: 'school',
    link: '/cell-flex-hourly'
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
