<template>
  <div class="activity-detail">
    <div class="main-block">
      <div class="cover-block">
        <div class="cover">
          <img src="https://res.cloudinary.com/drxazklch/image/upload/v1653753745/s-union/anh-background-doan-thanh-nien-don-gian-dep_093953592-1024x572_ytzysa.png" alt="">
        </div>
        <div class="registration-info">
          <div class="registration-quantity">
            <div class="open-quantity-block">
              <v-icon color="#E91E63" size="24">mdi-openid</v-icon>
              <span class="quantity-text"> {{ activity.participant_quantity }}</span>
              <span class="quantity-title">SỐ LƯỢNG MỞ</span>
            </div>
            <div class="registered-quantity-block">
              <v-icon color="#FF5722" size="24">mdi-account-multiple-plus</v-icon>
              <span class="quantity-text"> {{activity.students ? activity.students.length : 0}}</span>
              <span class="quantity-title">ĐÃ ĐĂNG KÝ</span>
            </div>
            <div class="attendance-quantity-block">
              <v-icon color="#4CAF50" size="24">mdi-account-group</v-icon>
              <span class="quantity-text"> {{ activity.attendanceQuantity }}</span>
              <span class="quantity-title">ĐIỂM DANH</span>
            </div>
          </div>
          <div class="registration-time">
            <div class="open-time-block">
              <v-icon
                size="36px"
                color="#00ACED">mdi-clock
              </v-icon>
              <div class="open-time">
                <span class="sub-title"> {{ formatDate(activity.begin_registration_at) }}</span>
                <span class="box-title">Mở đăng ký</span>
              </div>
            </div>
            <div class="close-time-block">
              <v-icon size="36px" color="#F44336">mdi-clock-remove</v-icon>
              <div class="close-time">
                <span class="sub-title"> {{ formatDate(activity.end_registration_at) }}</span>
                <span class="box-title">Đóng đăng ký</span>
              </div>
            </div>
          </div>
          <div class="btn-block">
            <div class="btn-register">
              <v-btn
                class="btn btn-register"
                color="blue darken-1"
                @click="register"
                :disabled="disabledRegistrationButton"
              >
                <v-icon dark size="24">mdi-file-edit</v-icon>
                <span class="ml-2">Đăng ký tham gia</span>
              </v-btn>
            </div>
            <div class="btn-attendance">
              <v-btn
                class="btn btn-cancel-attendance"
                color="green darken-1"
                @click="attend"
                :disabled="disabledAttendButton"
              >
                <v-icon dark size="24">mdi-card-account-details</v-icon>
                <span class="ml-2">Điểm danh hoạt động</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="information">
        <div class="detail">
          <div class="activity-content">
            <div class="box-title">Chi tiết</div>
            <v-divider class="my-1"></v-divider>
            <div class="host">
              <v-icon>mdi-account</v-icon>
              <span>Được tổ chức bởi khoa Công nghệ thông tin</span>
            </div>
            <div class="time">
              <v-icon>mdi-timer</v-icon>
              <span>Thứ năm, ngày 22 tháng 6</span>
            </div>
            <div class="location">
              <v-icon>mdi-map-marker-radius</v-icon>
              <span>Hội trường khu F, Đại học Bách Khoa Đà Nẵng</span>
            </div>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel metus mollis, tincidunt diam a, finibus justo. Donec nec interdum enim. Integer et leo quis turpis lobortis pellentesque. Phasellus vel ipsum egestas, tempus quam vitae, fermentum libero. Etiam mattis leo urna, sit amet maximus nibh faucibus sit amet. Vivamus pretium purus nisi, ac varius velit aliquam tristique. Integer aliquet lorem mauris, sed ornare libero eleifend at. Maecenas commodo, eros ac accumsan ultricies, turpis massa ornare orci, sed finibus turpis ante nec ante. Suspendisse vitae lectus scelerisque, tempor libero et, mollis leo. Suspendisse tincidunt, ligula vel pretium molestie, tellus nisi auctor magna, vel mollis odio eros vitae est. Ut auctor cursus turpis, in tristique felis egestas et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Nulla nec lacus felis. Mauris a massa cursus lectus rhoncus iaculis.
              Fusce at aliquam felis, ac dignissim nunc. Donec tincidunt in enim vitae tristique. Suspendisse auctor ultricies dolor, eu convallis felis ultrices non. Praesent lectus ex, porttitor ut risus sed, sollicitudin viverra quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam tellus nibh, egestas in augue at, consectetur viverra lacus. Aliquam erat volutpat. Praesent maximus ultricies sapien, id porttitor mi finibus a. Proin purus lacus, gravida in tristique eget, finibus sit amet sem. Aenean vel laoreet erat, ut aliquam lectus.
              Praesent nec tempor orci. Fusce molestie viverra lacus id feugiat. Quisque et mauris nunc. Vivamus interdum mi non blandit dictum. Quisque sed viverra leo. Nunc aliquam, lectus ut vehicula varius, augue tortor sagittis orci, at luctus neque nunc a quam. Sed ultrices est et mauris iaculis dignissim. Etiam ante elit, gravida id magna eu, malesuada euismod dui. Curabitur consectetur fringilla dolor. Quisque aliquam finibus quam, in accumsan justo sollicitudin a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam blandit nisl at lacinia auctor. Pellentesque congue vel nulla ac dignissim. Nunc nunc augue, pellentesque ut mattis ut, mollis in augue. Morbi eget iaculis ex, nec faucibus ligula. Fusce neque eros, euismod id massa ornare, iaculis rutrum ex.
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="confirmDialog"
      width="400px"
      persistent
    >
      <confirm-dialog
        @confirm-dialog="handleConfirm"
        :title="dialogTitle"
        :content="dialogContent"
      ></confirm-dialog>
    </v-dialog>
    <v-dialog
      v-model="QRCodeReaderDialog"
      width="400px"
      height="400px"
      persistent
    >
      <QRCodeReaderDialog
        :isAttending="isAttending"
        :success="success"
        :fail="fail"
        @qr-code-reader-dialog="qrCodeReaderDialogHandler"/>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";
import QRCodeReaderDialog from "@/views/ActivityEvent/QRCodeReaderDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import jwt from 'jsonwebtoken';
import timeUtils from '@/utils/time';

export default {
  name: "Detail",
  components: {
    QRCodeReaderDialog,
    ConfirmDialog,
  },
  computed: {
    ...mapGetters({
      activity: 'getActivity',
    }),
    disabledRegistrationButton() {
      const currentTime = timeUtils.getCurrentTime();
      const beginRegistrationAt = timeUtils.formatTime(this.activity.begin_registration_at);
      const endRegistrationAt = timeUtils.formatTime(this.activity.end_registration_at);
      if (Date.parse(beginRegistrationAt) <= Date.parse(currentTime) ||
        Date.parse(endRegistrationAt)  > Date.parse(currentTime)
      ) {
        return true;
      }
      if (this.activity.iscurrentUserRegistered) {
        return true;
      }
      return false;
    },
    disabledAttendButton() {
      if (!this.activity.iscurrentUserRegistered) {
        return true;
      }
      if (this.activity.isCurrentUserAttended) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      QRCodeReaderDialog: false,
      confirmDialog: false,
      dialogTitle: '',
      dialogContent: '',
      action: '',
      success: false,
      fail: false,
      isAttending: false,
    }
  },
  methods: {
    ...mapActions({
      fetchGetActivityById: 'fetchGetActivityById',
      fetchRegister: 'fetchRegister',
      fetchAttend: 'fetchAttend',
    }),
    async qrCodeReaderDialogHandler(data) {
      if (data.command === 'Cancel') {
        this.isAttending = false;
        this.success = false;
        this.fail = false;
        this.QRCodeReaderDialog = false;
      }
      if (data.command === 'Ok') {
        console.log('a');
        this.isAttending = true;
        await jwt.verify(data.code, process.env.VUE_APP_QR_KEY, async (error, payload) => {
          if (error) {
            console.log('b');
          this.isAttending = false;
            this.fail = true;
            return;
          }
          const activityId = this.$route.params.id;
          if (payload.activityId !== activityId) {
            this.isAttending = false;
            this.fail = true;
          }
          const isAttended = await this.fetchAttend({ activityId: activityId });
          if (isAttended) {
            console.log('c');
            this.isAttending = false;
            this.success = true;
            await this.fetchGetActivityById({ id: activityId });
          } else {
            this.isAttending = false;
            this.fail = false;
          }
        });
      }
    },
    register() {
      this.action = 'Register';
      this.dialogTitle = 'Đăng ký tham gia hoạt động';
      this.dialogContent = 'Bạn có chắc chắn muốn đăng ký tham gia hoạt động này không';
      this.confirmDialog = true;
    },
    attend() {
      this.QRCodeReaderDialog = true;
    },
    async handleConfirm(command) {
      if (command === 'Ok') {
        if (this.action === 'Register') {
          console.log('activity - ', this.activity);
          let isRegistered = await this.fetchRegister({activityId: this.$route.params.id});
          if (isRegistered) {
            const activityId = this.$route.params.id;
            await this.fetchGetActivityById({ id: activityId });
          }
          this.confirmDialog = false;
          return;
        }
      }
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
    },
    formatDate(time) {
      return timeUtils.formatDate(time)
    },
  },
  async created() {
    const activityId = this.$route.params.id;
    await this.fetchGetActivityById({ id: activityId });
  }
}
</script>

<style lang="scss">
.activity-detail {
  .main-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cover-block {
      max-width: 1080px;
      display: flex;
      justify-content: center;
      column-gap: 16px;
      .cover {
        img {
          max-width: 600px;
          max-height: 370px;
          width: 600px;
          height: 260px;
          border-radius: 4px;
          border: 8px solid #FFFFFF;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
      }

      .registration-info {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        max-width: 480px;
        .registration-time {
          display: flex;
          justify-content: center;
          column-gap: 16px;
          .box-title {
            font: normal 400 15px Roboto;
            text-transform: uppercase;
            color: #99abb4;
          }
          .sub-title {
            font: normal 700 17px/30px Roboto;
            color: #455a64;
          }
          .open-time-block,
          .close-time-block {
            width: 230px;
            height: 74px;
            padding: 10px 20px;
            display: flex;
            column-gap: 20px;
            color: #455a64;
            background: #FFFFFF;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            border-radius: 4px;
            .open-time, .close-time {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        }
        .registration-quantity {
          display: flex;
          justify-content: center;
          column-gap: 16px;
          max-width: 480px;
          .open-quantity-block,
          .registered-quantity-block,
          .attendance-quantity-block {
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            border-radius: 4px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            height: 100px;
            width: 148px;
            text-align: center;
            .quantity-text {
              font: normal 500 22px Roboto;
              color: #455a64;
              margin-top: 4px;
              margin-bottom: 4px;
            }
            .quantity-title {
              font: normal 400 14px Roboto;
              color: #99abb4;
            }

          }
          .open-quantity-block {
            border-top: 4px solid #E91E63;
          }
          .registered-quantity-block {
            border-top: 4px solid #FF5722;
          }
          .attendance-quantity-block {
            border-top: 4px solid #4CAF50;
          }
        }
        .btn-block {
          display: flex;
          column-gap: 16px;
          .btn-register {
            .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
              background-color: #b0ddee !important;
              color: #FFFFFF !important;
            }
            i {
              color: #FFFFFF !important;
            }
          }
          .btn-attendance {
            .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
              background-color: #bdfbbf !important;
              color: #FFFFFF !important;
            }
            i {
              color: #FFFFFF !important;
            }
          }
          .btn {
            color: #FFFFFF !important;
            font: normal 300 15px Roboto !important;
            text-transform: none !important;
            letter-spacing: 0 !important;
            width: 230px;
            height: 48px;
          }
        }
      }
    }
  }
  .information {
    width: 100%;
    max-width: 1080px;
    .detail {
      width: 100%;
      display: flex;
      column-gap: 16px;
      justify-content: center;
      .activity-content {
        width: 100%;
        //height: 500px;
        border-radius: 4px;
        background-color: #FFFFFF;
        padding: 16px 20px;
        .box-title {
          font: normal 500 20px Roboto;
          color: #455a64;
        }
        .host, .time, .location {
          display: flex;
          column-gap: 6px;
          align-items: center;
          color: #455a64;
          height: 30px;
        }
        .content {
          height: 100%;
          width: 100%;
          text-align: justify;
        }
      }
      .map {

      }
    }
  }
}
</style>