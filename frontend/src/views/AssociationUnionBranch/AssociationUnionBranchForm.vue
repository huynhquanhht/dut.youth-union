<template>
  <v-card class="form-card">
    <div class="form-toolbar d-flex align-center justify-space-between pl-4 pr-2 py-2"
        >
      <span>Thêm mới Liên chi đoàn</span>
      <v-btn
          icon
          dark
          @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <form class="form-block d-flex justify-center pa-3">
      <div class="form-left mr-6">
        <div class="input-name">
          <span class="label">Tên *</span>
          <v-text-field
              class="input-text"
              solo
              dense
          ></v-text-field>
        </div>
        <div class="input-a-union-branch">
          <span class="label">Tên Bí thư *</span>
          <v-text-field
              class="input-text"
              solo
              dense
          ></v-text-field>
        </div>
        <div class="input-email">
          <span class="label">Email *</span>
          <v-text-field
              class="input-text"
              solo
              dense
          ></v-text-field>
        </div>
      </div>
      <div class="form-right">
        <div class="input-address">
          <span class="label">Địa chỉ *</span>
          <v-text-field
              class="input-text"
              solo
              dense
          ></v-text-field>
        </div>
        <div class="input-phone">
          <span class="label">Số điện thoại *</span>
          <v-text-field
              class="input-text"
              solo
              dense
          ></v-text-field>
        </div>
      </div>
    </form>
    <div class="btn-block d-flex justify-end">
      <v-btn class="btn-save" color="primary">Lưu</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "AssociationUnionBranchForm",
  data() {
    return {
      id: null,
      name: null,
      birthday: null,
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
  }
  .form-block {
    display: flex;
    .v-text-field .v-input__control .v-input__slot {
      min-height: 32px !important;
      font: normal 400 14px Roboto;
    }
    .v-input__slot {
      width: 260px !important;
    }
    .label {
      font: normal 400 14px Roboto;
    }
    .v-text-field__details {
      margin-bottom: 0px !important;
    }
  }
  .btn-block {
    padding: 0 28px 16px 16px;
    .btn-save {
      text-transform: unset !important;
      font: normal 400 14px Roboto !important;
      letter-spacing: 0;
    }
  }
}
</style>