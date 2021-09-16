<script setup lang="ts">
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import { reactive } from 'vue';
  import { IUserInsert, createAccount } from '../services/api';

  import { createToast } from 'mosha-vue-toastify';
  import router from '../router';

  const account = reactive({
    email: '',
    name: '',
    password: '',
    repeatedPassword: '',
  } as IUserInsert);

  const handleSubmit = async () => {
    const { message, type } = await createAccount(account);
    if (type === 'SUCCESS') {
      createToast(message, { type: 'success' });
      router.push('/login');
    } else {
      createToast(message, { type: 'danger' });
    }
  };
</script>

<template>
  <nav>
    <div>
      <div class="logo"></div>
    </div>
    <div>
      <router-link to="/login" class="clickable"> Realizar login </router-link>
    </div>
  </nav>
  <div class="center">
    <div class="container">
      <div class="headerContainer">
        <h2>Criar conta</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input
            id="nome"
            v-model="account.name"
            type="text"
            class="form-control"
            placeholder="Entre o seu nome"
          />
        </div>

        <div class="form-group">
          <label for="nome">E-mail</label>
          <input
            id="nome"
            v-model="account.email"
            type="email"
            class="form-control"
            placeholder="Entre o seu e-mail"
          />
        </div>

        <div class="form-group">
          <label for="nome">Senha</label>
          <input
            id="nome"
            v-model="account.password"
            type="password"
            class="form-control"
            placeholder="Entre com sua senha"
          />
        </div>

        <div class="form-group">
          <label for="nome">Repita a senha</label>
          <input
            id="nome"
            v-model="account.repeatedPassword"
            type="password"
            class="form-control"
            placeholder="Repita a sua senha"
          />
        </div>

        <div class="buttonContainer">
          <ButtonComponent text="Criar conta" />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    .container {
      max-width: 400px;
      margin: 1rem;
      margin-top: 3rem;
      flex-grow: 1;

      .buttonContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-start;
      }

      .headerContainer {
        display: flex;
        justify-content: space-between;
      }

      form {
        margin-top: 2rem;

        .form-group {
          display: flex;
          flex-direction: column;

          margin-bottom: 1rem;

          label {
            font-weight: 600;
          }

          > *:nth-child(2) {
            margin-top: 0.3rem;
            border: 1px solid $main-color;
            padding: 0.3rem 0.6rem;
            border-radius: 0.2rem;
            font-family: 'Open Sans';
          }
        }
      }
    }
  }
</style>
