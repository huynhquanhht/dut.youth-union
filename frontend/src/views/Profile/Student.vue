<template>
<div class="student-profile-wrapper">
  <div class="student-info">
    <div class="avatar-block">
      <img src="../../assets/image/default-avatar.png" alt="">
    </div>
    <div class="info-block pt-8">
      <div class="personal">
        <span class="name"> {{ currentStudentInfo.student.name}}</span>
        <span class="role">Sinh viên</span>
        <span class="student-code">Mã sinh viên: {{ currentStudentInfo.student.id}}</span>
        <span class="class">Lớp: {{currentStudentInfo.student.activity_class.name}}</span>
        <span class="faculty">Khoa: {{currentStudentInfo.student.activity_class.faculty.name}}</span>
      </div>
    </div>
  </div>
  <v-divider></v-divider>
</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Student",
  computed: {
    ...mapGetters({
      currentStudentInfo: 'getCurrentStudentInfo',
    })
  },
  methods: {
    ...mapActions({
      fetchGetCurrentUserProfile: 'fetchGetCurrentUserProfile',
    })
  },
  created() {
    this.fetchGetCurrentUserProfile();
  }
}
</script>

<style lang="scss">
.student-profile-wrapper {
  background-color: #FFFFFF;
  height: 100vh;
  padding: 32px 20px 20px 20px;
  border-radius: 8px;
  .student-info {
    display: flex;
    column-gap: 40px;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    .avatar-block {
      padding: 0px 20px;
      img {
        width: 180px;
        height: 180px;
        border-radius: 100%;
        border: 4px solid #FFFFFF;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      }
    }
    .info-block {
      width: 100%;
      .personal {
        span {
          display: block;
        }
        .name {
          font: normal 500 20px Roboto;
          color: #000000;
        }
        .role {
          font: normal 500 17px Roboto;
          color: #24A2DB;
          margin-bottom: 20px;
        }
        .student-code {
          font: normal 300 15px Roboto;
          color: #939597;
        }
        .class {
          font: normal 300 15px Roboto;
          color: #939597;
        }
        .faculty {
          font: normal 300 15px Roboto;
          color: #939597;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>