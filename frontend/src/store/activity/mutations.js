const mutations = {
  setActivityList(state, activityList) {
    state.activityList = activityList;
  },
  setActivityPage(state, page) {
    state.activityPage = page;
  },
  setActivitySize(state, size) {
    state.activitySize = size;
  },
  setActivity(state, activity) {
    state.activity = activity;
  }
};
export default mutations;