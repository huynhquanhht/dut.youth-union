import studentApi from '@/api/student';
import MESSAGE from "@/utils/message";

const actions = {
  fetchGetStudents: async ({commit}, query) => {
    const res = await studentApi.get(query);
    commit('setStudents', res.data);
  },
  fetchCreateStudentByCSV: async ({commit}, payload) => {
    try {
      const res = await studentApi.createByCSV(payload.file);
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
  fetchGetStudentById: async ({commit}, payload) => {
    const res = await studentApi.getById(payload.id);
    commit('setStudent', res.data);
  },
  fetchCreateStudent: async ({commit}, payload) => {
    try {
      await studentApi.create(payload.student);
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
  fetchUpdateStudent: async ({commit}, payload) => {
    try {
      await studentApi.update(payload.student);
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
  }
};

export default actions;