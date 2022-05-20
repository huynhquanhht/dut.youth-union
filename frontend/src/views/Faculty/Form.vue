<template>
  <v-card class="form-card">
    <div class="form-toolbar d-flex align-center justify-space-between pl-4 pr-2 py-1">
      <span v-if="!faculty" class="form-title">Thêm mới Liên chi đoàn</span>
      <span v-else class="form-title">Chỉnh sửa Liên chi đoàn</span>
      <v-btn
          icon
          dark
          @click="$emit('close-form')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <form class="form-block px-4 pt-2 pb-2">
        <div class="input-name">
          <span class="label">Tên <span class="require">(*)</span></span>
          <v-text-field
              class="input-text mb-1"
              solo
              dense
              hide-details
              v-model="name"
          ></v-text-field>
      </div>
      <div class="btn-block d-flex justify-end">
        <v-btn
          class="btn-save"
          color="primary"
          :disabled="!name"
        >Lưu</v-btn>
      </div>
    </form>

  </v-card>
</template>

<script>
export default {
  name: "Form",
  props: {
    faculty: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {  
    return {
      id: null,
      name: this.faculty ? this.faculty.name : '',
      birthday: null,
    }
  },
  created() {
    console.log('faculty - ', this.faculty);
  }
}
</script>

<style lang="scss">
.form-card {
  .form-toolbar {
    background-color: #0B91E7;
    color: #ffffff;
    font: normal 400 17px Roboto;
  }
  .form-block {
    .form-title {
      font: normal 400 17px Roboto;
    }
    .v-text-field .v-input__control .v-input__slot {
      min-height: 32px !important;
      font: normal 400 14px Roboto;
    }
    .v-input__slot {
      width: 100% !important;
    }
    .label {
      font: normal 400 14px Roboto;
    }
    .v-text-field__details {
      margin-bottom: 0px !important;
    }
  }
  .btn-block {
    //padding: 0 16px 16px 16px;
    .btn-save {
      text-transform: unset !important;
      font: normal 400 14px Roboto !important;
      letter-spacing: 0;
    }
    .v-btn--disabled {
      color: #FFFFFF !important;
    }
    .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
      background-color: #78baef !important;
    }
  }
}
</style>