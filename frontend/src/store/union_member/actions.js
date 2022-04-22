import unionMemberApi from '@/api/union_member';

const actions = {
  fetchGetAllUnionMembers: async ({commit}, options) => {
    try {
      const res = await unionMemberApi.getAll(options.page, options.size);
      commit('setUnionMemberList', res.data);
    } catch (error) {
      console.log(error);
    }
  },
  fetchGetUnionMembers: async ({commit}, query) => {
    try {
      const res = await unionMemberApi.get(query);
      commit('setUnionMemberList', res.data);
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;