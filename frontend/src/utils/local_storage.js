const localStorageUtils = (function () {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
    }
    return _service;
  }
  function _setToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  function _getToken() {
    return localStorage.getItem('accessToken');
  }
  function _clearToken() {
    localStorage.removeItem('accessToken');
  }
  function _setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  function _getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  function _clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }
  function _clearAll() {
    localStorage.clear();
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
    setCurrentUser: _setCurrentUser,
    getCurrentUser: _getCurrentUser,
    clearCurrentUser: _clearCurrentUser,
    clearAll: _clearAll,
  };
})();

export default localStorageUtils;
