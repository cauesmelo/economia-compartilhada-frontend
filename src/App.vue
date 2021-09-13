<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  // import Bottom from '@/components/Bottom.vue';
  import { computed } from 'vue';
  import store from './store';
  const isAuthenticated = computed(
    () => store.getters['isAuthenticated']
  ).value;
</script>

<template>
  <body>
    <Navigation v-if="isAuthenticated" />
    <router-view />
    <!-- <Bottom v-if="isAuthenticated" /> -->
  </body>
</template>
