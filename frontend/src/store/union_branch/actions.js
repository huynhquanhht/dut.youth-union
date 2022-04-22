import unionBranchApi from '@/api/union_branch';
const actions = {
  // fetchGetUnionBranchList: async ({commit}, options) => {
  //   try {
  //     const res = await unionBranchApi.getAll(options.page, options.size);
  //     console.log(res);
  //     commit('setUnionBranchList', res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  fetchGetUnionBranchList: async ({commit}, query) => {
    try {
      const res = await unionBranchApi.get(query);
      commit('setUnionBranchList', res.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;