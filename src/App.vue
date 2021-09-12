<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Bottom from '@/components/Bottom.vue'
import Login from '@/views/Login.vue'
import { ref } from 'vue';

const isAuthenticated = ref(false);

</script>

<template>
  <body v-if="isAuthenticated">
    <Navigation />
    <router-view />
    <Bottom />
  </body>

  <body v-else>
    <Login/>
  </body>
</template>

