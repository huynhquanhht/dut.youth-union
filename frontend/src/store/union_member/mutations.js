import timeUtils from '@/utils/time';
const mutations = {
  setUnionMemberList(state, unionMemberList) {
    unionMemberList.Students.forEach((student) => {
      student.Fullname = student.LastName + ' ' + student.FirstName;
      student.Birthday = timeUtils.convertDateTimeToDate(student.Birthday);
      if (student.Gender === 1) {
        student.GenderName = 'Nam';
      } else if (student.Gender === 2) {
        student.GenderName = 'Nữ';
      } else {
        student.GenderName = 'Khác';
      }
    });
    state.unionMemberList = unionMemberList;
  },
};

export default mutations;