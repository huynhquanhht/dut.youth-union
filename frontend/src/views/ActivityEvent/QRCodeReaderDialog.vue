<template>
<div class="QR-code-reader-dialog-wrapper">
  <div class="title-block">
    <span>QR CODE - ĐIỂM DANH</span>
  </div>
  <div class="content">
    <span>Vui lòng đặt mã QR vào khung để tiến hành nhận diện</span>
  </div>
  <div class="QR-code-reader-block">
    <qrcode-stream class="qrcode-stream" @decode="onDecode"></qrcode-stream>
  </div>
  <div class="btn-block">
    <v-btn
      class="btn btn-cancel-attendance"
      color="red darken-1"
      @click="dialogHandler"
    >
      Hủy điểm danh
    </v-btn>
  </div>
</div>
</template>

<script>

export default {
  name: "QRCodeReaderDialog",
  methods: {
    onDecode (decodedString) {
      this.$emit('qr-code-reader-dialog', {command: 'Ok', code: decodedString})
    },
    dialogHandler() {
      this.$emit('qr-code-reader-dialog', {command: 'Cancel'})
    }
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
    .qrcode-stream {
      width: 210px;
      height: 210px;
      box-shadow: rgb(16, 101, 233) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      border: 4px solid #FFFFFF;
    }
  }
  .btn-block {
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