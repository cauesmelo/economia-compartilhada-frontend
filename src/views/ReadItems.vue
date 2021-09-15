<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  import { computed, ref, reactive } from 'vue';
  import store from '../store';
  import { getItems, IItem, deleteItem } from '../services/api';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import Pagination from '@/components/Pagination.vue';
  import Modal from '@/components/Modal.vue';
  import router from '../router';
  import { createToast } from 'mosha-vue-toastify';

  const token = computed(() => store.state.token).value;
  const items = reactive([] as IItem[]);
  const totalItems = ref(0);
  const currentPage = ref(0);
  const itemToDelete = ref(0);

  (async () => {
    const { data, total, current_page } = await getItems(1, token);
    items.push(...data);
    totalItems.value = total;
    currentPage.value = current_page;
  })();

  const handleNew = () => {
    router.push('/criar-item');
  };

  const handleDelete = (id: number) => {
    itemToDelete.value = id;
    showModal.value = true;
  };

  const handleCloseModal = () => {
    showModal.value = false;
    itemToDelete.value = 0;
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete.value, token);
      createToast('Item removido.', { type: 'success' });
      Object.assign(
        items,
        items.filter((i) => i.id !== itemToDelete.value)
      );
      itemToDelete.value = 0;
    } catch (err) {
      createToast('Não foi possível remover item.', { type: 'danger' });
    } finally {
      showModal.value = false;
    }
  };

  const handleEdit = (id: number) => {
    const item = items.find((i) => i.id === id) || ({} as IItem);
    router.push({
      path: `/alterar-item/${id}`,
      query: {
        ...item,
      },
    });
  };

  const handleOpen = (id: number) => {
    console.log('open', id);
  };

  const showModal = ref(false);
</script>

<template>
  <Navigation />
  <Modal
    title="Atenção"
    text="Deseja remover permanentemente o item?"
    type="DANGER"
    :show="showModal"
    @closeModal="handleCloseModal"
    @confirm="handleConfirmDelete"
  />
  <Suspense>
    <div class="center">
      <div class="container">
        <div class="headerContainer">
          <div class="headerContainerText">
            <h2>Itens compartilhados</h2>
          </div>
          <div class="headerContainerButton">
            <ButtonComponent
              text="Novo item"
              icon="white-Plus"
              @click="handleNew"
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Descrição</td>
              <td>Tipo</td>
              <td></td>
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

        <Pagination :current="currentPage" :total="totalItems" />
      </div>
    </div>
  </Suspense>
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

      .headerContainer {
        display: flex;
        justify-content: space-between;
        .headerContainerText {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .headerContainerButton {
          display: flex;
          align-items: center;
          justify-content: center;
        }
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

          &:nth-of-type(2) {
            width: 99%;
          }
        }

        tr {
          &:nth-of-type(even) {
            background-color: #f3f3f3;
          }

          .buttonsContainer {
            align-items: center;
            justify-content: flex-end;
            display: flex;
            gap: 0.5rem;
            > div {
              opacity: 0.8;
              cursor: pointer;
              width: 1.5rem;
              height: 1.5rem;

              &:hover {
                opacity: 1;
              }

              &:nth-of-type(1) {
                background-image: url('../assets/icons/Show.svg');
              }

              &:nth-of-type(2) {
                background-image: url('../assets/icons/Edit.svg');
              }

              &:nth-of-type(3) {
                background-image: url('../assets/icons/Delete.svg');
              }
            }
          }
        }
      }
    }
  }
</style>
