import activityClassApi from '@/api/activity_class';
const actions = {
  fetchGetActivityClassList: async ({commit}, query) => {
    const res = await activityClassApi.get(query);
    console.log(res);
    commit('setActivityClassList', res.data);
  },
};

export default actions;