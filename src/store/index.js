import {createStore} from 'vuex';

export default createStore({
  state: {
    showStartMenu: false,
    activeWindow: 'Posts',
    windows: [
      {
        name: 'Posts',
        cssClass: 'open'
      },
      {
        name: 'Users',
        cssClass: 'open'
      },
      {
        name: 'Other',
        cssClass: 'close'
      },
    ]
  },
  getters: {
    getWindowsForBottomBar(state) {
      return state.windows.filter(window => window.cssClass !== 'close');
    }
  },
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
      state.windows.find(el => el.name == args.windowName).cssClass = args.newClass;
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
