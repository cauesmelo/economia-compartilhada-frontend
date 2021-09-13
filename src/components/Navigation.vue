<script setup lang="ts">
  import { createToast } from 'mosha-vue-toastify';
  import { useRouter } from 'vue-router';
  import store from '../store';
  import { computed } from 'vue';
  const state = computed(() => store.state).value;
  const router = useRouter();

  const handleLogout = () => {
    store.commit('logout');
    router.push('/login');
    createToast('Logout realizado com sucesso', { type: 'success' });
  };
</script>

<template>
  <nav>
    <div>
      <div class="logo"></div>
      <router-link to="/listar-items" class="clickable"> Itens</router-link>
    </div>
    <div>
      <div>Olá, {{ state.name }}</div>
      <router-link to="/atualizar-senha" class="clickable">
        Trocar senha
      </router-link>
      <a class="clickable" @click="handleLogout">Logout</a>
    </div>
  </nav>
</template>

<style lang="scss">
  nav {
    margin: 0 auto;
    width: 90%;
    display: flex;
    align-items: center;
    height: 4rem;
    > div {
      display: flex;
      width: 50%;
      height: 100%;
      align-items: center;

      > * {
        margin: 0 1rem;
      }

      a {
        text-decoration: none;
        color: $main-color;
      }

      .clickable {
        transition: 0.2s all linear;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      &:first-of-type {
        .logo {
          background-image: url('../assets/tava-logo2.png');
          width: 5rem;
          height: calc(100% - 1rem);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 0;
        }
      }

      &:nth-of-type(2) {
        display: flex;
        justify-content: right;
      }
    }
  }
</style>
