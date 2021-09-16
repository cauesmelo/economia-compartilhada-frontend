<script setup="props" lang="ts">
  import { defineProps, defineEmits, getCurrentInstance } from 'vue';

  const ITEMS_PER_PAGE = 10;

  interface Props {
    current: number;
    total: number;
  }

  const { emit } = getCurrentInstance()!;

  defineProps<Props>();

  defineEmits(['changePage']);

  const changePage = (pageNumber: number) => emit('changePage', pageNumber);

  const calcPages = (total: number) => Math.ceil(total / ITEMS_PER_PAGE);
</script>

<template>
  <div class="paginationComponentContainer">
    <div
      v-if="current > 1"
      :class="{ disable: current === 1 }"
      @click="changePage(current - 1)"
    >
      &lt;&lt;
    </div>
    <div v-show="current > 3" @click="changePage(current - 3)">
      {{ current - 3 }}
    </div>
    <div v-show="current > 2" @click="changePage(current - 2)">
      {{ current - 2 }}
    </div>
    <div v-show="current > 1" @click="changePage(current - 1)">
      {{ current - 1 }}
    </div>
    <div class="currentPage">{{ current }}</div>
    <div v-show="calcPages(total) > current" @click="changePage(current + 1)">
      {{ current + 1 }}
    </div>
    <div
      v-show="calcPages(total) > current + 1"
      @click="changePage(current + 2)"
    >
      {{ current + 2 }}
    </div>
    <div
      v-show="calcPages(total) > current + 2"
      @click="changePage(current + 3)"
    >
      {{ current + 3 }}
    </div>
    <div
      v-if="current < calcPages(total)"
      :class="{ disable: current === calcPages(total) }"
      @click="changePage(current + 1)"
    >
      &gt;&gt;
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .paginationComponentContainer {
    display: flex;
    gap: 1rem;

    > div {
      cursor: pointer;
      text-align: center;
      min-width: 2rem;
    }

    .currentPage {
      background-color: $accent-color;
      color: $bg-color;
      border-radius: 10%;
    }
  }
</style>
