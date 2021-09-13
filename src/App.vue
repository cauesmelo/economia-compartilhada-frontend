<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Bottom from '@/components/Bottom.vue'
</script>

<template>
  <body>
    <Navigation />
    <router-view />
    <Bottom />
  </body>
</template>

