<template>
  <div class="collection-period-dialog">
    <v-card-title class="card-title">
      {{ title }}
    </v-card-title>
    <v-card-text class="content">
      {{ content }}
    </v-card-text>
    <form class="form-block pt-1 pb-2">
      <div class="input-id">
        <span class="label">Đợt thu <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="collectionPeriod"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Số tiền <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="moneyQuantity"
        ></v-text-field>
      </div>
    </form>
    <div class="btn-block">
      <div class="btn-ok">
        <v-btn
          class="btn"
          color="blue darken-1"
          @click="btnOkHandler"
          :loading="btnOkLoading"
          :disabled="(!collectionPeriod || !moneyQuantity)"
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
  name: "CollectionPeriodDialog",
  props: {
    btnOkLoading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      title: 'Tạo đợt thu đoàn phí',
      content: 'Nhập các dữ liệu bên dưới để khởi tạo dữ liệu',
      loadingButton: false,
      fileInput: null,
      uploadedFile: null,
      collectionPeriod: null,
      moneyQuantity: null,
    }
  },
  methods: {
    uploadFile(file) {
      this.uploadedFile = file;
    },
    btnOkHandler() {
      this.$emit('collection-period-dialog', { command: 'Ok', unionFee: {
          schoolYear: this.collectionPeriod,
          amountOfMoney: this.moneyQuantity
        }
      });
    },
    btnCancelHandler() {
      this.collectionPeriod = null;
      this.moneyQuantity = null;
      this.$emit('collection-period-dialog', { command: 'Cancel' });
    }
  },
}
</script>

<style lang="scss">
.collection-period-dialog {
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