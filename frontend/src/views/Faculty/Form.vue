<template>
  <v-card class="form-card">
    <div class="form-toolbar d-flex align-center justify-space-between pl-4 pr-2 py-1">
      <span class="form-title"> {{ title }}</span>
      <v-btn
          icon
          dark
          @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <form class="form-block px-4 pt-2 pb-2">
      <div class="input-id">
        <span class="label">Mã khoa <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="id"
        ></v-text-field>
      </div>
        <div class="input-name">
          <span class="label">Tên khoa <span class="require">(*)</span></span>
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
          @click="save"
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
    },
    formType: {
      type: String,
      default: 'Tạo mới khoa',
    }
  },
  data() {  
    return {
      id: this.faculty ? this.faculty.id : '',
      name: this.faculty ? this.faculty.name : '',
      birthday: null,
      title: ''
    }
  },
  methods: {
    save() {
      if (this.formType === 'Create') {
        this.$emit('faculty-form', {
          command: 'Create',
          faculty: { id: this.id, name: this.name },
        });
      }
      if (this.formType === 'Update') {
        this.$emit('faculty-form', {
          command: 'Update',
          faculty: { id: this.id, name: this.name },
        });
      }
    },
    close() {
      this.id = null;
      this.name = null,
      this.$emit('faculty-form', {
        command: 'close',
      })
    }
  },
  watch: {
    faculty() {
      this.id = this.faculty ? this.faculty.id : '';
      this.name = this.faculty ? this.faculty.name : '';
    },
    formType() {
      console.log('abc');
      if (this.formType === 'Create') {
        this.title = 'Tạo mới khoa';
      }
      if (this.formType === 'Update') {
        this.title = 'Cập nhật khoa';
      }
    }
  },
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