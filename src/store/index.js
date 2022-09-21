import { createStore } from 'vuex';

export default createStore({
  state: {
    showStartMenu: false
  },
  getters: {
  },
  mutations: {
    toggleShowStartMenu(state, action) {
      if (action === 'hide') {
        state.showStartMenu = false;
      } else {
        state.showStartMenu = !state.showStartMenu;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
