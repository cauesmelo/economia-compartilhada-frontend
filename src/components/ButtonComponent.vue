<script setup="props" lang="ts">
  import { defineProps } from 'vue';

  interface Props {
    text: string;
    icon?: string;
  }

  defineProps<Props>();
</script>

<template>
  <div class="buttonComponentContainer">
    <div class="icon"></div>
    <button class="button-9" role="button">
      <img :src="'./src/assets/icons/' + icon + '.svg'" />
      <p>{{ text }}</p>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .buttonComponentContainer {
    display: flex;
    justify-content: center;
  }

  .button-9 {
    appearance: button;
    backface-visibility: hidden;
    background-color: $accent-color;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all 0.2s, box-shadow 0.08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    transition: 0.5s all linear;

    &:hover {
      filter: brightness(1.2);
    }

    &:active {
      filter: contrast(1.2);
    }
  }
</style>
