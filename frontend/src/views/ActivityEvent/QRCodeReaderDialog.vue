<template>
<div class="QR-code-reader-dialog-wrapper">
  <div class="title-block">
    <span>QR CODE - ĐIỂM DANH</span>
  </div>
  <div class="content">
    <span>Vui lòng đặt mã QR vào khung để tiến hành nhận diện</span>
  </div>
  <div class="QR-code-reader-block" v-if="!success && !fail">
    <qrcode-stream class="qrcode-stream" @decode="onDecode"></qrcode-stream>
    <div class="overlay" v-if="isAttending">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
      <span>Đang điểm danh...</span>
    </div>
  </div>
  <div class="attendance-result" v-else>
    <div class="attendance-success" v-if="success">
      <check-mark/>
      <div class="result-text-block">
        <span class="result-text">Điểm danh thành công</span>
      </div>
    </div>
    <div class="attendance-fail" v-if="fail">
      <cross-icon/>
      <div class="result-text-block">
        <span class="result-text">Điểm danh thất bại</span>
      </div>
    </div>
  </div>
  <div class="btn-block">
    <v-btn
      class="btn btn-cancel-attendance"
      color="primary"
      width="90px"
      @click="reset"
      :disabled="isAttending || success"
    >
      Làm mới
    </v-btn>
    <v-btn
      class="btn btn-cancel-attendance"
      color="red darken-1"
      width="90px"
      @click="dialogHandler"
      :disabled="isAttending"
    >
      Thoát
    </v-btn>
  </div>
</div>
</template>

<script>
import CheckMark from "@/components/CheckMark";
import CrossIcon from '@/components/CrossIcon';
export default {
  name: "QRCodeReaderDialog",
  components: {
    CheckMark,
    CrossIcon
  },
  props: {
    isAttending: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false
    },
    fail: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      enableReset: false,
    }
  },
  methods: {
    onDecode (decodedString) {
      // console.log('abc - ', decodedString);
      console.log('decodedString');
      this.$emit('qr-code-reader-dialog', {command: 'Ok', code: decodedString})
    },
    dialogHandler() {
      this.$emit('qr-code-reader-dialog', {command: 'Cancel'})
    },
    reset() {
      this.success = false;
      this.fail = false;
    }
  },
  created() {
    console.log('mmm');
  }
}
</script>

<style lang="scss">
.QR-code-reader-dialog-wrapper {
  width: 400px;
  height: 400px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 28px 20px 20px 20px;
  .title-block {
    font: normal 600 18px Roboto;
    color: #0E76E9;
  }
  .content {
    font: normal 300 15px Roboto;
    color: #616161 !important;
    margin-top: 2px;
  }
  .QR-code-reader-block {
    margin-top: 20px;
    position: relative;
    .qrcode-stream {
      width: 210px;
      height: 210px;
      box-shadow: rgb(16, 101, 233) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      border: 4px solid #FFFFFF;
    }
    .overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: white;
      opacity: 0.9;
      width: 210px;
      height: 210px;
      position: absolute;
      top: 0;
      span {
        margin-top: 12px;
      }
    }
  }
  .attendance-result {
    margin-top: 20px;
    height: 200px;
    .attendance-success {

    }
    .attendance-fail {

    }
    .result-text-block {
      text-align: center;
      margin-top: 12px;
      .result-text {
        font: normal 500 16px Roboto;
      }
    }
  }
  .btn-block {
    display: flex;
    column-gap: 8px;
    margin-top: 28px;
    .btn-cancel-attendance {
      color: #FFFFFF !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
      font: normal 400 15px Roboto !important;
    }
  }
}
</style>