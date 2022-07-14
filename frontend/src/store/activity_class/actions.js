import activityClassApi from '@/api/activity_class';
import MESSAGE from "@/utils/message";

const actions = {
  fetchCreateActivityClass: async ({commit}, payload) => {
    try {
      console.log('activityClass - ', payload.activityClass);
      await activityClassApi.create(payload.activityClass);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: MESSAGE.CREATE_SUCCESS,
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
  fetchUpdateActivityClass: async ({commit}, payload) => {
    try {
      await activityClassApi.update(payload.activityClass);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: MESSAGE.UPDATE_SUCCESS,
      });
      return true;
    } catch (error) {
      console.log(error);
      commit('setSnackbar', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
      return false;
    }
  },
  fetchGetActivityClassList: async ({commit}, query) => {
    const res = await activityClassApi.get(query);
    console.log(res);
    commit('setActivityClassList', res.data);
  },
  fetchGetActivityClassById: async ({commit}, payload) => {
    const res = await activityClassApi.getById(payload.id);
    console.log('res - ', res);
    commit('setActivityClass', res.data);
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