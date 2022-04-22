import aUnionBranchApi from '@/api/association_union_branch';
const actions = {
  fetchGetAllAUnionBranch: async ({commit}) => {
    try {
      const res = await aUnionBranchApi.getAll();
      commit('setAUnionBranchList', res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
export default actions;