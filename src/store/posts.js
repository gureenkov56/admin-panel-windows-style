export default {
  namespaced: true,
  state: {
    posts: [],
    test: 'test'
  },
  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {

  }
}