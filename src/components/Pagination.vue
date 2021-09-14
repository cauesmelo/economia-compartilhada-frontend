<script setup="props" lang="ts">
  import { defineProps } from 'vue';

  const ITEMS_PER_PAGE = 10;

  interface Props {
    current: number;
    total: number;
  }

  defineProps<Props>();

  const calcPages = (total: number) => Math.ceil(total / ITEMS_PER_PAGE);
</script>

<template>
  <div class="paginationComponentContainer">
    <div :class="{ disable: current === 1 }">&lt;&lt;</div>
    <div v-show="current > 3">
      {{ current - 3 }}
    </div>
    <div v-show="current > 2">
      {{ current - 2 }}
    </div>
    <div v-show="current > 1">
      {{ current - 1 }}
    </div>
    <div>{{ current }}</div>
    <div v-show="calcPages(total) > current">
      {{ current + 1 }}
    </div>
    <div v-show="calcPages(total) > current + 1">
      {{ current + 2 }}
    </div>
    <div v-show="calcPages(total) > current + 2">
      {{ current + 3 }}
    </div>
    <div :class="{ disable: current === calcPages(total) }">&gt;&gt;</div>
  </div>
</template>

<style lang="scss" scoped>
  .paginationComponentContainer {
    display: flex;

    > div {
      cursor: pointer;
      text-align: center;
      min-width: 2rem;
    }
  }
</style>
