import userApi from '@/api/user';

const actions = {
  fetchLogin: async ({commit}, loginInfo) => {
    try {
      let res = await userApi.login(loginInfo);
      commit('setLoginResult', res.data.loginResult);
    } catch (error) {
      commit('setLoginResult', null);
    }
  },
  fetchGetUsers: async ({commit}, query) => {
    let res = await userApi.get(query);
    commit('setUsers', res.data);
  },
  fetchGetUserById: async ({commit}, query) => {
    let res = await userApi.getById(query.userId);
    commit('setUser', res.data);
  }
};

export default actions;