export default {
  state: {
    postStore: []
  },
  mutations: {
    getPosts(state, posts) {
      state.postStore = posts;
    }
  },
  actions: {

  }
}