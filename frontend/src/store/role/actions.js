import  roleApi from '@/api/role';

const actions = {
  fetchGetAllRoles: async ({commit}) => {
    const res = await roleApi.getAll();
    console.log('res - ', res);
    commit('setRoles', res.data);
  },
  fetchGetRoleById: async ({commit}, payload) => {
    const res = await roleApi.getById(payload.id);
    commit('setRole', res.data);
  },
}

export default actions;