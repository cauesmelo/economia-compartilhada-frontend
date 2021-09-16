<script setup lang="ts">
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import Modal from '@/components/Modal.vue';
  import Navigation from '@/components/Navigation.vue';
  import { reactive, computed, ref } from 'vue';
  import { getItem } from '../services/api';
  import store from '../store';
  import { createToast } from 'mosha-vue-toastify';
  import router from '../router';
  import { useRoute } from 'vue-router';

  const token = computed(() => store.state.token).value;
  const route = useRoute();
  const showDelete = ref(false);
  const itemToDelete = ref(0);

  const item = reactive({
    id: +route.params.id,
    name: '',
    desc: '',
    type: '',
    share: [],
  });

  const handleSubmit = async () => {
    try {
      await getItem(+route.params.id, token);
      createToast('Item atualizado', { type: 'success' });
      router.push('/listar-itens');
    } catch (err) {
      createToast('Ocorreu um erro. Tente novamente.', { type: 'danger' });
      console.log(err);
    }
  };

  const loadItem = async () => {
    const { nome, tipo, descricao, compartilhamentos } = await getItem(
      +route.params.id,
      token
    );

    item.name = nome;
    item.type = tipo;
    item.desc = descricao;
    item.share = compartilhamentos;
  };

  const handleShare = () => {
    router.push({
      path: `/compartilhar/${item.id}`,
      query: {
        name: item.name,
      },
    });
  };

  const handleCancelShare = () => {
    showDelete.value = true;
  };

  const handleCloseModal = () => {
    showDelete.value = false;
    itemToDelete.value = 0;
  };

  const handleConfirmDelete = async () => {
    console.log('deletar item', itemToDelete.value);
  };

  loadItem();
</script>

<template>
  <Navigation />
  <Modal
    title="Atenção"
    text="Deseja cancelar o compartilhamento?"
    type="DANGER"
    :show="showDelete"
    @closeModal="handleCloseModal"
    @confirm="handleConfirmDelete"
  />
  <div class="center">
    <div class="container">
      <div class="headerContainer">
        <h2>Detalhamento de item compartilhado</h2>
      </div>

      <h3>Nome</h3>
      <p>{{ item.name }}</p>

      <h3>Descrição</h3>
      <p>{{ item.desc }}</p>

      <h3>Tipo</h3>
      <p>{{ item.type }}</p>

      <div class="buttonContainer">
        <ButtonComponent
          text="Compartilhar"
          icon="white-Send"
          @click="handleShare"
        />
      </div>

      <h2 class="margin-top">Compartilhamentos</h2>
      <table>
        <thead>
          <tr>
            <td>Usuário</td>
            <td>Início</td>
            <td>Termino</td>
            <td>status</td>
            <td></td>
          </tr>
        </thead>

        <tr>
          <td>teste@gmail.com</td>
          <td>15/09/2021</td>
          <td>25/09/2021</td>
          <td>Aberto</td>
          <td class="buttonsContainer">
            <div class="closeIcon" @click="handleCancelShare"></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .margin-top {
    margin-top: 4rem;
  }
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    .container {
      max-width: 1280px;
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
        color: $accent-color;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
        font-size: 0.9rem;
        min-width: 400px;

        thead {
          tr {
            font-weight: 600;
            background-color: $accent-color;
            color: $bg-color;
            text-align: left;
          }
        }

        th,
        td {
          padding: 12px 15px;

          &:nth-of-type(1) {
            white-space: nowrap;
            padding-right: 4rem;
          }
        }

        tr {
          &:nth-of-type(even) {
            background-color: #f3f3f3;
          }

          .buttonsContainer {
            display: flex;
            justify-content: flex-end;

            .closeIcon {
              opacity: 0.8;
              cursor: pointer;
              width: 1.5rem;
              height: 1.5rem;

              &:hover {
                opacity: 1;
              }

              background-image: url('../assets/icons/Close.svg');
            }
          }
        }
      }
    }
  }
</style>
