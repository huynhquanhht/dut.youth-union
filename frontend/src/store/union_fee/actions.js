import unionFeeApi from '@/api/union_fee';

const actions = {
  fetchGetUnionFees: async ({commit}, query) => {
    const res = await unionFeeApi.get(query);
    commit('setUnionFees', res.data);
  },
  fetchGetUnionFeeOfStudents: async ({commit}, query) => {
    const res = await unionFeeApi.getOfStudent(query);
    commit('setUnionFeeOfStudents', res.data);
  }
};

export default actions;