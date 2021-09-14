<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue';
  import { computed, ref } from 'vue';
  import store from '../store';
  const token = computed(() => store.state.token).value;
  import { getItems, IItem } from '../services/api';
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import Pagination from '@/components/Pagination.vue';

  let items = ref([] as IItem[]);
  let totalItems = ref(0);
  let currentPage = ref(0);

  (async () => {
    const { data, total, current_page } = await getItems(1, token);
    items.value = data;
    totalItems.value = total;
    currentPage.value = current_page;
  })();
</script>

<template>
  <Navigation />
  <Suspense>
    <div class="center">
      <div class="container">
        <div class="headerContainer">
          <div class="headerContainerText">
            <h2>Itens compartilhados</h2>
          </div>
          <div class="headerContainerButton">
            <ButtonComponent text="Novo item" icon="white-Plus" />
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
              <div class="openBtn"></div>
              <div class="editBtn"></div>
              <div class="deleteBtn"></div>
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
