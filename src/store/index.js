import {createStore} from 'vuex';
import posts from './posts'

export default createStore({
  state: {
    showStartMenu: false,
    activeWindow: 'Posts',
    windows: [
      {
        name: 'Posts',
        cssClass: 'open',
        fullScreen: false
      },
      {
        name: 'Users',
        cssClass: 'close',
        fullScreen: false
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
      if (args.newClass !== 'open') {
        state.activeWindow = null;
      } else {
        state.activeWindow = args.windowName;
      }
    },
    toggleFullScreenWindow(state, windowName) {
      state.activeWindow = windowName;
      const window = state.windows.find(el => el.name == windowName);
      window.fullScreen = !window.fullScreen;
    },
    setActiveWindow(state, newActiveWindow) {
      state.activeWindow = newActiveWindow;
    },
    addMaxZIndexToWindow(state, toWindow) {
      state[toWindow].cssClass += 'active';
    },
  },
  actions: {},
  modules: {
    posts
  },
});
