<template>
  <div class="qr-code-wrapper">
    <div class="top-block">
      <div class="title-qr-code">
        <span>MÃ QR HOẠT ĐỘNG</span>
      </div>
      <div class="activity-info">
        <span>Mã hoạt động: {{ data.activityId }}</span>
        <span>Tên hoạt động: {{ data.activityName }}</span>
      </div>
    </div>
    <div class="qr-code">
      <qrcode-vue :value="data.code" :size="size" level="H"/>
    </div>
    <div class="btn-block">
      <v-btn
        width="140px"
        class="download-button"
        color="#0078D4"
      >
        <a></a>
        <v-icon dark size="20" class="mr-2">mdi-download</v-icon>
        Tải mã QR
      </v-btn>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: "QRCodeDialog",
  components: {
    QrcodeVue
  },
  props: {
    data: {
      type: Object,
    }
  },
  data() {
    return {
      value: 'abc',
      size: 120,
    }
  },
  methods: {
    selectText(element) {
      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },

    copyBlobToClipboardFirefox(href) {
      const img = document.createElement('img');
      img.src = href;
      const div = document.createElement('div');
      div.contentEditable = true;
      div.appendChild(img);
      document.body.appendChild(div);
      this.selectText(div);
      const done = document.execCommand('Copy');
      document.body.removeChild(div);
      return done;
    },

    copyBlobToClipboard(blob) {
      // eslint-disable-next-line no-undef
      const clipboardItemInput = new ClipboardItem({
        'image/png': blob
      });
      return navigator.clipboard
        .write([clipboardItemInput])
        .then(() => true)
        .catch(() => false);
    },

    downloadLink(name, href) {
      const a = document.createElement('a');
      a.download = name;
      a.href = href;
      document.body.append();
      a.click();
      a.remove();
    }
  }
}
</script>

<style lang="scss">
.qr-code-wrapper {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 0px 36px 0px;

  .top-block {
    .title-qr-code {
      text-align: center;
      font: normal 700 20px Roboto;
    }

    .activity-info {
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      font: normal 400 14px Roboto;
      background-color: #EEF0F4;
      padding: 10px 20px;
      border-radius: 12px;
    }
  }

  .qr-code {
    padding: 10px;
    box-shadow: rgb(16, 101, 233) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    margin-top: 36px;
    border-radius: 8px;
  }

  .btn-block {
    margin-top: 36px;

    .download-button {
      color: #FFFFFF !important;
      border-radius: 50px;
      letter-spacing: 0;
      text-transform: none;
    }
  }
}

</style>