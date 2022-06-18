import activityClassApi from '@/api/activity_class';
const actions = {
  fetchGetActivityClassList: async ({commit}, query) => {
    const res = await activityClassApi.get(query);
    console.log(res);
    commit('setActivityClassList', res.data);
  },
  fetchUploadActivityClassCSV: async ({commit}, payload) => {
    try {
      console.log('payload - ', payload);
      const res = await activityClassApi.uploadCSV(payload.file);
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
  fetchDeleteActivityClass: async ({commit}, payload) => {
    try {
      const res = await activityClassApi.deleteActivityClass(payload.activityClassId);
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