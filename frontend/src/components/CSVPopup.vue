<template>
  <div class="csv-popup">
    <v-card-title class="card-title">
      {{ title }}
    </v-card-title>
    <v-card-text class="content">
      {{ content }}
    </v-card-text>
    <div class="file-input-block">
      <v-file-input
        @change="uploadFile"
        v-model="fileInput"
        truncate-length="10"
      ></v-file-input>
    </div>
    <div class="btn-block">
      <div class="btn-ok">
        <v-btn
          class="btn"
          color="blue darken-1"
          @click="btnOkHandler"
          :loading="btnOkLoading"
          :disabled="!fileInput"
        >
          Tạo dữ liệu
        </v-btn>
      </div>
      <div class="btn-cancel">
        <v-btn
          class="btn"
          color="red darken-1"
          @click="btnCancelHandler"
          :disabled="btnOkLoading"
        >
          Hủy
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CSVPopup",
  props: {
    btnOkLoading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      title: 'Tạo dữ liệu bằng nhập CSV',
      content: 'Tải file (.csv) để thực hiện tạo dữ liệu',
      loadingButton: false,
      fileInput: null,
      uploadedFile: null,
    }
  },
  methods: {
    uploadFile(file) {
      this.uploadedFile = file;
    },
    btnOkHandler() {
      this.fileInput = null;
      this.$emit('csv-dialog', { command: 'Ok', file: this.uploadedFile });
    },
    btnCancelHandler() {
      this.fileInput = null;
      this.$emit('csv-dialog', { command: 'Cancel' });
    }
  },
}
</script>

<style lang="scss">
.csv-popup {
  background-color: #FFFFFF;
  padding: 16px;
  .content {
    font: normal 400 15px Roboto;
    letter-spacing: 0;
    color: #616161 !important;
  }
  .card-title {
    font: normal 600 19px Roboto !important;
    padding-bottom: 8px !important;
  }
  .v-dialog > .v-card > .v-card__text {
    //padding: 0 24px 0px;
  }
  .btn {
    font: normal 400 14px Roboto;
    letter-spacing: 0;
  }
  .file-input-block {
    padding-right: 10px;
  }
  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0px;
  }
  .v-text-field {
    padding-top: 0px;
  }
  .btn-block {
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 8px;
    color: #FFFFFF;
    .v-btn__content {
      color: #FFFFFF;
      text-transform: none;
      letter-spacing: 0;
    }
    .btn-ok {
      .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
        background-color: #aad0f1 !important;
      }
      .v-btn__loader {
        color: #FFFFFF;
      }
    }
  }
}
</style>