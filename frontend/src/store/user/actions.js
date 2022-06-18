import userApi from '@/api/user';

const actions = {
  fetchLogin: async ({commit}, loginInfo) => {
    try {
      let res = await userApi.login(loginInfo);
      console.log('a');
      commit('setLoginResult', res.data.loginResult);
      return true;
    } catch (error) {
      console.log('b');
      commit('setLoginResult', null);
      return false;
    }
  },
  fetchGetUsers: async ({commit}, query) => {
    let res = await userApi.get(query);
    commit('setUsers', res.data);
  },
  fetchGetUserById: async ({commit}, query) => {
    let res = await userApi.getById(query.userId);
    commit('setUser', res.data);
  },
  fetchGetCurrentUserProfile: async ({commit}) => {
    let res = await userApi.getCurrentUserProfile();
    commit('setCurrentStudentInfo', res.data);
}
};

export default actions;