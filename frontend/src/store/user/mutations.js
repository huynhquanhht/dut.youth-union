const mutations = {
  setLoginResult: (state, loginResult) => {
    state.loginResult = loginResult;
  },
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.user = user;
  }
};
export default mutations;