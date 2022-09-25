import {createStore} from 'vuex';

export default createStore({
  state: {
    showStartMenu: false,
    activeWindow: 'Posts',
    windows: {
      Posts: {
        cssClass: 'open',
      },
      Users: {
        cssClass: 'hide',
      },
      Other: {
        cssClass: 'close',
      }
    }
  },
  getters: {},
  mutations: {
    toggleShowStartMenu(state, action) {
      if (action === 'hide') {
        state.showStartMenu = false;
      } else {
        state.showStartMenu = !state.showStartMenu;
      }
    },
    changeWindowsStatus(state, args) {
      // args = {windowName String, newClass String};
      state.windows[args.windowName].cssClass = args.newClass;
    },
    setActiveWindow(state, newActiveWindow) {
      state.activeWindow = newActiveWindow;
    },
    addMaxZIndexToWindow(state, toWindow) {
      state[toWindow].cssClass += 'active';
    }
  },
  actions: {},
  modules: {},
});
