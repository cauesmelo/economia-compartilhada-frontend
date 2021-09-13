import { createStore } from 'vuex';

const state = {
  name: '',
  admin: false,
  token: '',
};

interface rawState {
  nome: string;
  administrador: boolean;
  token: string;
}

export type State = typeof state;

export default createStore({
  state,
  mutations: {
    logout: (state) => {
      state.name = '';
      state.admin = false;
      state.token = '';
    },
    login: (state: State, user: rawState) => {
      state.name = user.nome;
      state.admin = user.administrador;
      state.token = user.token;
    }
  },
  getters: {
    isAuthenticated: (state) => state.token !== ''
  }
});