<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import { reactive, computed, ref } from 'vue';
  import { shareItem } from '../services/api';
  import { useRoute } from 'vue-router';
  import { createToast } from 'mosha-vue-toastify';
  import store from '../store';
  import router from '../router';

  const route = useRoute();
  const token = computed(() => store.state.token).value;
  const itemName = ref(route.query.name);

  const share = reactive({
    itemId: +route.params.id,
    recipient: '',
    startDate: new Date(Date.now()).toISOString().split('T')[0],
    endDate: new Date(Date.now()).toISOString().split('T')[0],
  });

  const handleSubmit = async () => {
    if (new Date(share.endDate) < new Date(share.startDate)) {
      createToast('Data de início não pode ser maior que data final.', {
        type: 'danger',
      });
    } else {
      try {
        await shareItem(share, token);
        createToast('Compartilhamento realizado!', { type: 'success' });
        router.push(`/item/${share.itemId}`);
      } catch (err) {
        createToast('Ocorreu um erro. Tente novamente mais tarde.', {
          type: 'danger',
        });
        console.log(err);
      }
    }
  };
</script>

<template>
  <Navigation />
  <div class="center">
    <div class="container">
      <div class="headerContainer">
        <h2>
          Novo compartilhamento para
          <span class="accent-color">{{ itemName }}</span>
        </h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">E-mail do destinatário</label>
          <input
            id="nome"
            v-model="share.recipient"
            type="text"
            class="form-control"
            placeholder="Entre com o e-mail do destinatário"
          />
        </div>

        <div class="form-group">
          <label for="descricao">Data início</label>
          <input
            id="starDate"
            v-model="share.startDate"
            type="date"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="tipo">Data final</label>
          <input
            id="endDate"
            v-model="share.endDate"
            type="date"
            class="form-control"
          />
        </div>
        <div class="buttonContainer">
          <ButtonComponent text="Confirmar compartilhamento" icon="white-Ok" />
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
      max-width: 700px;
      margin: 1rem;
      margin-top: 3rem;
      flex-grow: 1;

      .buttonContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-start;
      }

      .headerContainer {
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
