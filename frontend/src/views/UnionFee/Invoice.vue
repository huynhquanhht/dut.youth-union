<template>
  <div id="invoice-wrapper">
    <div class="top-wrapper">
      <div class="school">
        <div class="school-text">
          <span>ĐOÀN ĐẠI HỌC ĐÀ NẴNG</span>
          <span>ĐOÀN TRƯỜNG ĐẠI HỌC BÁCH KHOA</span>
        </div>
      </div>
    </div>
    <div class="middle-wrapper">
      <div class="title-bill">
        <span class="name-bill">PHIẾU THU<span class="id-bill value"></span></span>
        <span class="date value date-submission"> {{ invoiceInfo.submissionDate}}</span>
      </div>
      <div class="payer-info">
        <span class="key student-id">Mã sinh viên: <span class="value"> {{ invoiceInfo.studentId }}</span></span>
        <span class="key student-name">Họ tên: <span class="value"> {{ invoiceInfo.studentName }}</span></span>
        <span class="key class-name">Lớp: <span class="value"> {{ invoiceInfo.activityClass }}</span></span>
        <span class="key faculty-name">Khoa: <span class="value"> {{ invoiceInfo.faculty }}</span></span>
        <span class="key reason">Lý do nộp: <span class="value"> {{ invoiceInfo.reason }} </span></span>
        <span class="key money-quantity">Số tiền: <span class="value"> {{ invoiceInfo.moneyText }}</span></span>
      </div>
      <div class="note-block">
        <span class="note-title">Ghi chú</span>
        <div class="note-frame"></div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="signature">
        <span class="people-action">Người lập phiếu</span>
        <span class="note">(Ký, họ tên)</span>
      </div>
      <div class="signature">
        <span class="people-action">Người nộp tiền</span>
        <span class="note">(Ký, họ tên)</span>
      </div>
      <div class="signature">
        <span class="people-action">Thủ quỹ</span>
        <span class="note">(Ký, họ tên)</span>
      </div>
      <div class="signature">
        <span class="people-action">Kế toán trưởng</span>
        <span class="note">(Ký, họ tên)</span>
      </div>
      <div class="signature">
        <span class="people-action">Thủ trưởng đơn vị</span>
        <span class="note">(Ký, họ tên)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invoice",
  props: {
    invoiceInfo: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style scoped>
.value {
  font-weight: 500;
}
#invoice-wrapper {
  width: 1000px;
  height: 600px;
  border: 1px solid black;
  padding: 36px 80px 90px 80px;
  color: #3F00FF;
}
.top-wrapper {
  text-align: left;
}
.school {
  display: flex;
  justify-content: flex-start;
}
.school-text {
  /*width: 300px;*/
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  font: normal 500 20px Roboto;
}
.middle-wrapper {
  text-align: center;
}
.title-bill {
  /*font: normal 700 28px Roboto;*/
  margin-top: 36px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}
.name-bill {
  font: normal 700 32px Roboto;
}
.id-bill {
  font: normal 400 20px Roboto;
}
.date {
  font: normal 400 18px Roboto;
}
.payer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
}
.key {
  font: normal 400 20px/32px Roboto;
}
.note-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

}
.note-frame {
  border: 2px solid #000000;
  width: 100%;
  height: 100px;
}
.note-title {
  font: normal 400 20px/32px Roboto;
}
.bottom-wrapper {
  margin-top: 20px;
  display: flex;
  column-gap: 85px;
  font: normal 400 20px/32px Roboto;
}
.signature {
  display: flex;
  flex-direction: column;
  align-items: center;
  font: normal 500 20px Roboto;
}
.signature .note {
  font: normal 400 17px Roboto;
}
</style>