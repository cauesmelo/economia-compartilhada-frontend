<script setup lang="ts">
  import { defineProps, reactive, defineEmits, getCurrentInstance } from 'vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';

  interface Props {
    title: string;
    text: string;
    type: 'SUCCESS' | 'DANGER' | 'INFO';
    show: boolean;
  }

  const { emit } = getCurrentInstance()!;

  const props = defineProps<Props>();

  let showModal = reactive(props);

  defineEmits(['closeModal', 'confirm']);

  const closeModal = () => emit('closeModal');
  const confirm = () => emit('confirm');
</script>

<template>
  <transition name="fade">
    <div v-show="showModal.show == true" class="modalContainer">
      <div class="modalWrapper">
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>

        <div class="line">
          <ButtonComponent text="Cancelar" type="DANGER" @click="closeModal" />
          <ButtonComponent text="Confirmar" @click="confirm" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .modalContainer {
    z-index: 99;
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: center;

    .modalWrapper {
      background-color: white;
      width: 30%;
      padding: 2rem;
      min-width: 300px;

      p {
        margin-top: 1rem;
      }

      .line {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: space-around;
      }
    }
  }
</style>
