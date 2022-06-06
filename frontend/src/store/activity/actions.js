import activityApi from '@/api/activity';
import cloudinaryApi from "@/api/cloudinary";
import MESSAGE from '@/utils/message';
const actions = {
  fetchGetActivityList: async ({commit}, query) => {
    const res = await activityApi.get(query);
    console.log('res -', res);
    commit('setActivityList', res.data);
  },
  fetchGetActivitiesByCurrentStudent: async ({commit}, query) => {
    const res = await activityApi.get(query);
    commit('setMyActivities', res.data);
  },
  fetchCreateActivity: async ({commit}, payload) => {
    try {
      await activityApi.create(payload.activity);
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
          text: error.response.data.message,
        });
      }
      return false;
    }
  },
  fetchGetById: async ({commit}, payload) => {
    const res = await activityApi.getById(payload.id);
    commit('setActivity', res.data);
  },
  fetchUpdateActivity: async ({commit}, payload) => {
    try {
      await activityApi.update(payload.id, payload.activity);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: MESSAGE.UPDATE_SUCCESS,
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        commit('setSnackbar', {
          type: 'error',
          visible: true,
          text: error.response.data.message,
        });
      }
      return false;
    }
  },
  fetchDeleteActivities: async ({commit}, payload) => {
    try {
      const res = await activityApi.deleteActivities(payload.activityIds);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: res.data.message,
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        commit('setSnackbar', {
          type: 'error',
          visible: true,
          text: error.response.data.message,
        });
      }
      return false;
    }
  },
  uploadActivityCover: async ({ commit }, payload) => {
    try {
      console.log(payload)
      let res = await cloudinaryApi.uploadActivityCover(payload.file);
      console.log(res)
      return res.data.url;
    } catch (error) {
      console.log(error.response);
      commit('setSnackbar', {
        type: 'error',
        visible: true,
        text: error.response.data.error.message,
      });
      return null;
    }
  }
};
export default actions;