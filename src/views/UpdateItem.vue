<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import { reactive, computed } from 'vue';
  import { IItem, updateItem } from '../services/api';
  import store from '../store';
  import { createToast } from 'mosha-vue-toastify';
  import router from '../router';
  import { useRoute } from 'vue-router';

  const token = computed(() => store.state.token).value;
  const route = useRoute();

  const item = reactive({
    id: +route.params.id,
    nome: route.query.nome,
    descricao: route.query.descricao,
    tipo: route.query.tipo,
  } as IItem);

  const handleSubmit = async () => {
    try {
      await updateItem(item, token);
      createToast('Item atualizado', { type: 'success' });
      router.push('/listar-itens');
    } catch (err) {
      createToast('Ocorreu um erro. Tente novamente.', { type: 'danger' });
      console.log(err);
    }
  };
</script>

<template>
  <Navigation />
  <div class="center">
    <div class="container">
      <div class="headerContainer">
        <h2>Alterar item compartilhado</h2>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input
            id="nome"
            v-model="item.nome"
            type="text"
            class="form-control"
            placeholder="Entre o nome do item"
          />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea
            id="descricao"
            v-model="item.descricao"
            rows="3"
            cols="80"
            class="form-control"
            placeholder="Descreva o item"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" v-model="item.tipo" class="form-control">
            <option value="UNICO">Item único</option>
            <option value="MULTIPLO">Item múltiplo</option>
          </select>
        </div>
        <div class="buttonContainer">
          <ButtonComponent text="Confirmar" />
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
