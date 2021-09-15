<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <Navigation />
  <div class="center">
    <div class="container">
      <div class="titleNotFound">
        <div class="iconNotFound"></div>
        <h2>Página não encontrada</h2>
      </div>
      <router-link to="/listar-itens" class="clickable">
        Ir para itens
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .center {
    width: 100%;
    display: flex;
    justify-content: center;

    .container {
      max-width: 1280px;
      margin: 1rem;
      margin-top: 3rem;
      flex-grow: 1;
      text-align: center;

      .titleNotFound {
        display: flex;
        align-items: center;
        justify-content: center;

        h2 {
          margin: 2rem 0.5rem;
        }

        .iconNotFound {
          height: 2rem;
          width: 2rem;
          background-image: url('../assets/icons/black-Danger.svg');
          background-size: cover;
          background-position: center;
        }
      }
    }
  }
</style>
