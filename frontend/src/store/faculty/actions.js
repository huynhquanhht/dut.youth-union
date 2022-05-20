import facultyApi from '@/api/faculty';
const actions = {
  fetchGetFaculties: async ({commit}) => {
    const res = await facultyApi.get();
    commit('setFaculties', res.data);
  },
  fetchGetFacultyById: async ({commit}, payload) => {
    const res = await facultyApi.getById(payload.id);
    console.log('res - ', res);
    commit('setFaculty', res.data);
  }
};
export default actions;