import unionFeeApi from '@/api/union_fee';

const actions = {
  fetchGetUnionFees: async ({commit}, query) => {
    const res = await unionFeeApi.get(query);
    commit('setUnionFees', res.data);
  },
  fetchGetUnionFeeOfStudents: async ({commit}, query) => {
    const res = await unionFeeApi.getOfStudent(query);
    commit('setUnionFeeOfStudents', res.data);
  },
  fetchSubmitUnionFee: async ({commit}, payload) => {
    try {
      const res = await unionFeeApi.submit(payload.changeUnionFee);
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
  fetchConfirmSubmissionUnionFee: async ({commit}, payload) => {
    try {
      console.log(payload);
      const res = await unionFeeApi.confirmSubmission(payload.unionFeeIds);
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