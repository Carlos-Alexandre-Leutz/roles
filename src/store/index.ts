import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null as string | null
  },
  mutations: {
    SET_USER_ID(state, id: string | null) {
      state.userId = id;
    }
  },
  getters: {
    userId: (state) => state.userId
  }
});