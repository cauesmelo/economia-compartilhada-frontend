<script setup="props" lang="ts">
  import { defineEmits, getCurrentInstance, ref } from 'vue';

  const { emit } = getCurrentInstance()!;

  const searchQuery = ref('');

  defineEmits(['search', 'clearSearch']);

  const search = () => emit('search', searchQuery.value);
  const clearSearch = () => {
    searchQuery.value = '';
    emit('clearSearch');
  };
</script>

<template>
  <div
    class="searchComponentContainer"
    :class="{ activeSearch: searchQuery !== '' }"
  >
    <div class="searchIcon" @click="search"></div>
    <input
      id="search"
      v-model="searchQuery"
      type="text"
      name="search"
      @keyup.enter="search"
    />
    <div v-if="searchQuery !== ''" class="clearIcon" @click="clearSearch"></div>
  </div>
</template>

<style lang="scss" scoped>
  .searchComponentContainer {
    border: 2px solid $accent-color;
    border-radius: 8px;
    height: 44px;
    width: 20rem;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0.3rem;

    .searchIcon {
      background-image: url('../assets/icons/Search.svg');
      background-size: contain;
      background-position: center;
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
    }

    .clearIcon {
      background-image: url('../assets/icons/Close.svg');
      background-size: contain;
      background-position: center;
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
    }

    input {
      background-color: transparent;
      border: 0;
      height: 100%;
      margin-left: 1rem;
      width: calc(100% - 4rem);

      &:focus {
        outline: none;
      }
    }
  }
</style>
