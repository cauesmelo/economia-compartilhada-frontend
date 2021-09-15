<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import { reactive, computed } from 'vue';
  import { updatePassword } from '../services/api';

  import store from '../store';
  import { createToast } from 'mosha-vue-toastify';
  import router from '../router';
  const token = computed(() => store.state.token).value;

  const item = reactive({
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
  });

  const handleSubmit = async () => {
    const { message, type } = await updatePassword(item, token);
    if (type === 'SUCCESS') {
      createToast(message, { type: 'success' });
      router.push('/listar-itens');
    } else {
      createToast(message, { type: 'danger' });
    }
  };
</script>

<template>
  <Navigation />
  <div class="center">
    <div class="container">
      <div class="headerContainer">
        <h2>Alterar senha</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="oldPassword">Senha atual</label>
          <input
            id="oldPassword"
            v-model="item.oldPassword"
            type="password"
            class="form-control"
            placeholder="entre com a senha atual"
          />
        </div>

        <div class="form-group">
          <label for="newPassword">Nova senha</label>
          <input
            id="newPassword"
            v-model="item.newPassword"
            type="password"
            class="form-control"
            placeholder="entre com a nova senha"
          />
        </div>

        <div class="form-group">
          <label for="repeatedNewPassword">Repita a nova senha</label>
          <input
            id="repeatedNewPassword"
            v-model="item.repeatedNewPassword"
            type="password"
            class="form-control"
            placeholder="repita a nova senha"
          />
        </div>

        <div class="buttonContainer">
          <ButtonComponent text="Alterar" icon="white-Swap" />
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
      max-width: 20rem;
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
