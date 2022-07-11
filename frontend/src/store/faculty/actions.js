import facultyApi from '@/api/faculty';
import MESSAGE from "@/utils/message";
const actions = {
  fetchGetFaculties: async ({commit}) => {
    const res = await facultyApi.get();
    commit('setFaculties', res.data);
  },
  fetchGetFacultyById: async ({commit}, payload) => {
    const res = await facultyApi.getById(payload.id);
    console.log('res - ', res);
    commit('setFaculty', res.data);
  },
  fetchCreateFaculty: async ({commit}, payload) => {
    try {
      await facultyApi.create(payload.faculty);
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
  fetchUpdateFaculty: async ({commit}, payload) => {
    try {
      await facultyApi.update(payload.faculty);
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
  }
};
export default actions;