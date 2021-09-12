import { computed, reactive } from 'vue';

const state = reactive({
  name: '',
  admin: false,
  token: '',
});

const getters = reactive({
  isLoggedIn: computed(() => state.token !== '')
});

const actions = {
  async login(username: string, password: string) {
    const user = await Request.login(username, password)
    if (user == null) {
      state.error = 'Could not find user.'
      return false
    }

    state.name = user.name
    state.username = username
    state.error = ''

    return true
  },
  async logout() {
    state.name = ''
    state.username = ''
  }
}

export default { state, getters, ...actions }