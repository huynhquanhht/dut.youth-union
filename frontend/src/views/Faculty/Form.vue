<template>
  <v-card class="form-card">
    <div class="form-toolbar pl-4 pr-2 py-1">
      <div class="left-tool">
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span class="form-title"> {{ title }}</span>
      </div>
      <div class="btn-block d-flex justify-end">
        <v-btn
          class="btn-save"
          color="primary"
          :disabled="!name"
          @click="save"
        >Lưu</v-btn>
      </div>
    </div>
    <form class="form-block px-4 pt-2 pb-2">
      <div class="input-id">
        <span class="label">Mã khoa <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          filled
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
      <div class="input-name">
        <span class="label">Địa chỉ <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="address"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Email <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="email"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Điện thoại <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="phone"
        ></v-text-field>
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
      default: 'Create',
    }
  },
  data() {  
    return {
      id: this.faculty ? this.faculty.id : '',
      name: this.faculty ? this.faculty.name : '',
      birthday: null,
      title: '',
      address: this.faculty ? this.faculty.address : '',
      email: this.faculty ? this.faculty.email : '',
      phone: this.faculty ? this.faculty.phone : '',
    }
  },
  methods: {
    save() {
      if (this.formType === 'Create') {
        this.$emit('faculty-form', {
          command: 'Create',
          faculty: {
            id: this.id,
            name: this.name,
            address: this.address,
            email: this.email,
            phone: this.phone,
          },
        });
      }
      if (this.formType === 'Update') {
        this.$emit('faculty-form', {
          command: 'Update',
          faculty: {
            id: this.id,
            name: this.name,
            address: this.address,
            email: this.email,
            phone: this.phone,
          },
        });
      }
    },
    close() {
      this.id = null;
      this.name = null,
      this.$emit('faculty-form', {
        command: 'close',
      });
      this.resetData();
    },
    resetData() {
      this.id = '';
      this.name = '';
      this.address = '';
      this.email = '';
      this.phone = '';
    }
  },
  watch: {
    faculty() {
      this.id = this.faculty ? this.faculty.id : '';
      this.name = this.faculty ? this.faculty.name : '';
      this.address = this.faculty ? this.faculty.address : '';
      this.email = this.faculty ? this.faculty.email : '';
      this.phone = this.faculty ? this.faculty.phone : '';
    },
    formType() {
      console.log('abc');
      if (this.formType === 'Create') {
        this.title = 'Tạo mới thông tin khoa';
      }
      if (this.formType === 'Update') {
        this.title = 'Cập nhật thông tin khoa';
      }
    }
  },
  created() {
    if (this.formType === 'Create') {
      this.resetData();
      this.title = 'Tạo mới thông tin khoa';
    }
    if (this.formType === 'Update') {
      this.title = 'Cập nhật thông tin khoa';
    }
  }
}
</script>

<style lang="scss">
.form-card {
  .form-toolbar {
    background-color: #0B91E7;
    color: #ffffff;
    font: normal 400 17px Roboto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-block {
      align-items: flex-end;
    }
    .left-tool {
      display: flex;
      align-items: center;
    }
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