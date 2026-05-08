import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null as string | null,
    isModalCreateOpen: false,
  },
  mutations: {
    SET_USER_ID(state, id: string | null) {
      state.userId = id;
    },
    SET_MODAL_CREATE(state, value) {
      state.isModalCreateOpen = value;
    }
  },
  actions: {
    openModalCreate({ commit }) {
      commit('SET_MODAL_CREATE', true);
    },
    closeModalCreate({ commit }) {
      commit('SET_MODAL_CREATE', false);
    }
  },
  getters: {
    userId: (state) => state.userId
  }
});