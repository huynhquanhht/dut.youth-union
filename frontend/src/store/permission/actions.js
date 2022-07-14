import  permissionApi from '@/api/permission';
import MESSAGE from "@/utils/message";

const actions = {
  fetchUpdatePermission: async ({commit}, payload) => {
    try {
      await permissionApi.update(payload.permission);
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
  },
}

export default actions;