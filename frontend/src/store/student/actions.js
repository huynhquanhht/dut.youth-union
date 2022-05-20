import studentApi from '@/api/student';

const actions = {
  fetchGetStudents: async ({commit}, query) => {
      const res = await studentApi.get(query);
      commit('setStudents', res.data);
  }
};

export default actions;