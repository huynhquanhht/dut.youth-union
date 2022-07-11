<template>
<div class="student-profile-wrapper">
  <div class="student-profile-block">
    <div class="title-block">
      <div class="title">
        <span>Hồ sơ sinh viên</span>
      </div>
      <div class="content">
        <span>Thông tin chi tiết</span>
      </div>
    </div>
    <div class="student-info">
      <div class="avatar-block">
        <img src="../../assets/image/default-avatar.png" alt="">
      </div>
      <div class="info-block pt-8">
        <div class="basic-info">
          <span class="name"> {{ currentStudentInfo.student.name}}</span>
          <span class="role">Sinh viên</span>
        </div>

      </div>
    </div>
    <div class="detail-info">
      <div class="info-icon">
        <v-icon size="28">mdi-card-account-details-outline</v-icon>
      </div>
      <div class="detail-block">
        <div class="detail">
          <div class="student-code">
            <span class="title-text">Mã sinh viên</span>
            <span class="content-text">{{ currentStudentInfo.student.id}}</span>
          </div>
          <div class="birthday">
            <span class="title-text">Ngày sinh</span>
            <span class="content-text">{{ currentStudentInfo.student.birthday}}</span>
          </div>
          <div class="email">
            <span class="title-text">Email</span>
            <span class="content-text">{{ currentStudentInfo.student.email}}</span>
          </div>
          <div class="phone">
            <span class="title-text">Điện thoại</span>
            <span class="content-text">{{ currentStudentInfo.student.phone}}</span>
          </div>
          <div class="class">
            <span class="title-text">Lớp</span>
            <span class="content-text">{{currentStudentInfo.student.activity_class.name}}</span>
          </div>
          <div class="faculty">
            <span class="title-text">Khoa</span>
            <span class="content-text">{{currentStudentInfo.student.activity_class.faculty.name}}</span>
          </div>
        </div>
          <v-divider></v-divider>
        <div class="union-member-detail">
          <div class="is-union-member">
            <span class="title-text">Đoàn viên chính thức</span>
            <div class="union-member-checkbox d-flex align-center ">
              <v-simple-checkbox
                color="info"
                v-model="currentStudentInfo.student.is_union_member"
                disabled
              ></v-simple-checkbox>
              <span class="content-text">Đoàn viên</span>
            </div>
          </div>
          <div class="student-code d-flex flex-column">
            <span class="title-text">Ngày vào đoàn</span>
            <span class="content-text">{{ timeUtils.formatDate(currentStudentInfo.student.union_textbook.join_union_at)}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import time from '@/utils/time';
export default {
  name: "Student",
  computed: {
    ...mapGetters({
      currentStudentInfo: 'getCurrentStudentInfo',
    })
  },
  data() {
    return {
      timeUtils: time,
    }
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
  height: 100vh;
  max-width: 100%;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title-block {
    align-items: flex-start;
    margin-top: 20px;
    .title {
      color: #141488;
      font: normal 600 20px/20px Roboto;
      text-transform: uppercase;
    }
    .content {
      color: #cbcbcb;
      font: normal 400 16px Roboto;
      margin-top: 4px;
    }
  }
  .student-profile-block {
    width: 800px;
    .student-info {
      margin-top: 12px;
      padding: 16px;
      background-color: #FFFFFF;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 8px;
      display: flex;
      column-gap: 12px;
      background-color: #FFFFFF;
      margin-bottom: 20px;
      .avatar-block {
        padding: 0px 20px;
        img {
          width: 128px;
          height: 128px;
          border-radius: 100%;
          border: 4px solid #FFFFFF;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
      }
      .info-block {
        width: 600px;
        .basic-info {
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
        }

      }
    }
    .detail-info {
      background-color: #FFFFFF;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      padding: 16px;
      border-radius: 8px;
      display: flex;
      .info-icon {
        width: 184px;
        padding: 0px 20px;
        text-align: center;
        display: flex;
        justify-content: center;
      }
      .detail-block {
        display: flex;
        column-gap: 36px;
        .detail {
          width: 50%;
          .student-code, .class, .faculty, .email, .phone, .birthday {
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
            .title-text {
              font: normal 400 15px Roboto;
              color: #cfcece;
            }
            .content-text {
              font: normal 500 15px Roboto;
              color: #888888;
            }
          }
          .birthday {
            .title-text {
              margin-top: 1px;
            }
          }
        }
        .union-member-detail {
          width: 50%;
          .title-text {
            font: normal 400 15px Roboto;
            color: #cfcece;
          }
          .content-text {
            font: normal 500 15px Roboto;
            color: #888888;
          }
        }
      }
    }
  }

}
</style>