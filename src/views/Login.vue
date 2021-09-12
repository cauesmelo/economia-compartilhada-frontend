<script setup lang="ts">
import { createToast } from "mosha-vue-toastify";

import { ref, getCurrentInstance } from "vue";

const app = getCurrentInstance();

const isLoading = ref(false);

const login = () => {
   createToast('Wow, easy', {type: 'danger'})
}
</script>

<template>
  <main>
    <div>
      <article>
        <img src="../assets/tava-logo2.png" alt="Tava Logo">
        <h3>Economia compartilhada</h3>
      </article>
      <article>
          <h3>Login</h3>
          <input type="text" placeholder="E-mail">
          <input type="password" placeholder="Senha">

          <router-link to="/about">Esqueci a senha</router-link>

          <button @click="login">Entrar</button>
      </article>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    background-image: $bg-light;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      background-color: $bg-color;
      min-width: 600px;
      width: 50vw;
      max-height: 100%;
      min-height: 40vw;
      display: flex;
      box-shadow: $box-shadow;
      border-radius: $radius;

      article {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        align-items: center;
        justify-content: center;
        width: 50%;
        border-radius: 0 $radius $radius 0;

        img {
          padding: 2rem;
        }

        &:nth-of-type(2){
          background-color: $accent-color;
          color: $bg-color;

          input {
            transition: 0.2s all linear;
            border: none;
            border-bottom: 1px solid $bg-color;
            width: 100%;
            padding:0.5rem 0.2rem;
            opacity: 0.9;
            margin-top:2rem;
            color: $bg-color;
            background-color: transparent;

            &:placeholder-shown{
              opacity: 0.7;
            }

            &:focus {
              opacity: 1;
            }

            &::placeholder {
              color: $bg-color;
            }
          }

          a {
            text-decoration: none;
            text-align:right;
            display: block;
            font-size: 0.7rem;
            color: $bg-color;
            margin-top: 0.5rem;
          }

          button {
            border: none;
            cursor: pointer;
            background-color: $bg-color;
            width: 100%;
            height: 2rem;
            margin-top: 2rem;
            color: $accent-color;
            text-transform: uppercase;
            transition: 0.2s box-shadow linear;
            
            &:hover {
              box-shadow: $box-shadow;
            }

            &:active{
              transform: translateY(0.1rem);
              margin-top:2.1rem;
              height: 1.9rem;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
</style>
