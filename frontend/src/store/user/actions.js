import userApi from '@/api/user';

const actions = {
  fetchLogin: async ({commit}, loginInfo) => {
    try {
      let res = await userApi.login(loginInfo);
      commit('setLoginResult', res.data.loginResult);
    } catch (error) {
      commit('setLoginResult', null);
    }
  }
};

export default actions;