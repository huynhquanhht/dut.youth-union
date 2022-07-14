import unionFeeApi from '@/api/union_fee';
import MESSAGE from "@/utils/message";

const actions = {
  fetchGetUnionFees: async ({commit}, query) => {
    const res = await unionFeeApi.get(query);
    commit('setUnionFees', res.data);
  },
  fetchGetUnionFeeOfStudent: async ({commit}) => {
    const res = await unionFeeApi.getOfStudent();
    commit('setUnionFeeOfStudent', res.data);
  },
  fetchGetUnionFeeOfStudents: async ({commit}, payload) => {
    console.log('mpq');
    const res = await unionFeeApi.getOfStudents(payload.query);
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
  },
  fetchGetInvoice: async ({commit}, payload) => {
    console.log('payload - ', payload);
    const res = await unionFeeApi.getInvoice(payload.studentId, payload.unionFeeId);
    console.log('res - ', res);
    commit('setInvoice', res.data);
  },
  fetchCreateUnionFee: async ({commit}, payload) => {
    try {
      await unionFeeApi.create(payload.unionFee);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: MESSAGE.CREATE_SUCCESS,
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        commit('setSnackbar', {
          type: 'error',
          visible: true,
          text: error.response.data.message
        })
      }
    }
  }
};

export default actions;