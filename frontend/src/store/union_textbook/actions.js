import unionTextbookApi from '@/api/union_textbook';

const actions = {
  fetchGetUnionTextbooks: async ({commit}, query) => {
    const res = await unionTextbookApi.get(query);
    commit('setUnionTextbooks', res.data);
  },
  fetchUpdateUnionTextbooks: async ({commit}, payload) => {
    try {
      const res = await unionTextbookApi.update(payload.changedUnionTextbook);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: res.data.message,
      });
      return true;
    } catch (error) {
      commit('setSnackbar', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
      return false;
    }
  },
  fetchConfirmSubmission: async ({commit}, payload) => {
    try {
      const res = await unionTextbookApi.confirmSubmission(payload.unionTextbookIds);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: res.data.message,
      });
      return true;
    } catch (error) {
      commit('setSnackbar', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
      return false;
    }
  }
};

export default actions;