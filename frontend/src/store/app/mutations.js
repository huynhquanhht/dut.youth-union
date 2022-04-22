const mutations = {
  setSnackbar(state, snackbar) {
    switch (snackbar.type) {
      case 'error':
        state.snackbar = {
          text: snackbar.text,
          visible: snackbar.visible,
          title: 'Lỗi',
          color: 'error',
          icon: 'mdi-alert-circle',
          mode: 'multi-line',
          timeout: 5000,
        };
        break;
      case 'info':
        state.snackbar = {
          text: snackbar.text,
          visible: snackbar.visible,
          title: 'Thông báo',
          color: 'info',
          icon: 'mdi-alert-circle',
          mode: 'multi-line',
          timeout: 5000,
        };
        break;
      case 'success':
        state.snackbar = {
          text: snackbar.text,
          visible: snackbar.visible,
          title: 'Thành công',
          color: 'success',
          icon: 'mdi-check-circle',
          mode: 'multi-line',
          timeout: 5000,
        };
        break;
      case 'warning':
        state.snackbar = {
          text: snackbar.text,
          visible: snackbar.visible,
          title: 'Cảnh báo',
          color: 'warning',
          icon: 'mdi-alert',
          mode: 'multi-line',
          timeout: 5000,
        };
        break;
    }
  }
};
export default mutations;