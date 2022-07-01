import newsApi from '@/api/news';
import MESSAGE from '@/utils/message';
const actions = {
  fetchGetNewsList: async ({commit}, query) => {
    const res = await newsApi.get(query);
    console.log('res -', res);
    commit('setNewsList', res.data);
  },
  fetchGetInformationList: async ({commit}, query) => {
    const res = await newsApi.get(query);
    commit('setInformationList', res.data);
  },
  fetchGetNotificationList: async ({commit}, query) => {
    const res = await newsApi.get(query);
    commit('setNotificationList', res.data);
  },
  fetchCreateNews: async ({commit}, payload) => {
    try {
      await newsApi.create(payload.news);
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
  fetchGetNewsById: async ({commit}, payload) => {
    const res = await newsApi.getById(payload.id);
    commit('setNews', res.data);
  },
  fetchUpdateNews: async ({commit}, payload) => {
    try {
      await newsApi.update(payload.id, payload.news);
      commit('setSnackbar', {
        type: 'success',
        visible: true,
        text: MESSAGE.UPDATE_SUCCESS,
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
  fetchDeleteActivities: async ({commit}, payload) => {
    try {
      const res = await newsApi.deleteActivities(payload.newsIds);
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
};
export default actions;