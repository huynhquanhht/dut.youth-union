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
  },
  setMyActivities(state, activites) {
    state.myActivities = activites;
  },
  setPointListOfCurrentStudent(state, pointList) {
    state.pointList = pointList;
  },
  setRegisteredList(state, registeredList) {
    state.registeredList = registeredList;
  }
};
export default mutations;