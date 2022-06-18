import activityApi from '@/api/activity';
import cloudinaryApi from "@/api/cloudinary";
import MESSAGE from '@/utils/message';
const actions = {
  fetchGetAllActivity: async ({commit}, query) => {
    const res = await activityApi.getAll(query);
    console.log('res -', res);
    commit('setActivityList', res.data);
  },
  fetchGetActivityByOption: async ({commit}, query) => {
    const res = await activityApi.get(query);
    console.log('res -', res);
    commit('setActivityList', res.data);
  },
  fetchGetActivitiesByCurrentStudent: async ({commit}, query) => {
    const res = await activityApi.getByCurrentStudent(query);
    commit('setMyActivities', res.data);
  },
  fetchGetPointListOfCurrentStudent: async ({commit}) => {
    const res = await activityApi.getPointListOfCurrentStudent();
    commit('setPointListOfCurrentStudent', res.data);
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
  fetchGetActivityById: async ({commit}, payload) => {
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
  },
  fetchOpenActivityRegistration: async ({ commit }, payload) => {
    try {
      const res = await activityApi.openActivityRegistration(payload.activityId);
      console.log('res - ', res);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: res.data.message,
      });
      return true;
    } catch (error) {
      if (error.response.status === 403) {
        commit('setSnackbar', {
          type: 'error',
          visible: true,
          text: error.response.data.message,
        });
        return false;
      }
      commit('setSnackbar', {
        type: 'error',
        visible: true,
        text: error.response.data.error.message,
      });
      return false;
    }
  },
  fetchCloseActivityRegistration: async ({ commit }, payload) => {
    try {
      const res = await activityApi.closeActivityRegistration(payload.activityId);
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
        text: error.response.data.error.message,
      });
      return false;
    }
  },
  fetchRegister: async ({commit}, payload) => {
    try {
      const res = await activityApi.register(payload.activityId);
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
        text: error.response.data.error.message,
      });
      return false;
    }
  },
  fetchAttend: async ({commit}, payload) => {
    try {
      const res = await activityApi.attend(payload.activityId);
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
        text: error.response.data.error.message,
      });
      return false;
    }
  },
};
export default actions;