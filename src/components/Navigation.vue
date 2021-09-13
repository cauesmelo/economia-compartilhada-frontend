<script setup lang="ts">
import { createToast } from "mosha-vue-toastify";
import { useRouter } from "vue-router";
import store from "../store";
const router = useRouter();

const handleLogout = () => {
  store.commit("logout");
  router.push('/login');
  createToast('Logout realizado com sucesso', { type: 'success' });
}
</script>

<template>
  <div class="nav">
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/about">
      About
    </router-link>
    <button @click="handleLogout">
      Logout
    </button>
  </div>
</template>

<style lang="scss">
  .nav {
    height: 4rem;
  }
</style>