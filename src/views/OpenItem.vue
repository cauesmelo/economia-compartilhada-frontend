<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
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
        <h2>Detalhamento de item compartilhado</h2>
      </div>

      <h3>Nome</h3>
      <p>Nome do item</p>

      <h3>Descrição</h3>
      <p>Descricao do item</p>

      <h3>Tipo</h3>
      <p>Tipo</p>

      <table>
        <thead>
          <tr>
            <td>Inicio</td>
            <td>Termino</td>
            <td>Usuário</td>
            <td>status</td>
          </tr>
        </thead>

        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.nome }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.tipo }}</td>
          <td class="buttonsContainer">
            <div class="openBtn" @click="handleOpen(item.id)"></div>
            <div class="editBtn" @click="handleEdit(item.id)"></div>
            <div class="deleteBtn" @click="handleDelete(item.id)"></div>
          </td>
        </tr>
      </table>
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

      .headerContainer {
        display: flex;
        justify-content: space-between;
      }

      h3 {
        margin-top: 1.5rem;
        font-weight: 600;
      }
    }
  }
</style>
