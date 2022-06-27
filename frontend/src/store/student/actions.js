import studentApi from '@/api/student';

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
  }
};

export default actions;