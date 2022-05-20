<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ title }}
    </v-card-title>
    <v-card-text class="content">
      {{ content }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="btn btn-cancel"
          color="red darken-1"
          text
          @click="$emit('confirm-dialog', 'Cancel')"
          :disabled="loadingButton"
      >
        Hủy
      </v-btn>
      <v-btn
        class="btn btn-ok"
          color="blue darken-1"
          text
          @click="$emit('confirm-dialog', 'Ok')"
          :loading="loadingButton"
      >
        Đồng ý
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    content: {
      type: String,
      default: 'Content',
    },
    loadingButton: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>
.content {
  font: normal 400 15px Roboto;
  letter-spacing: 0;
  color: #616161 !important;
}
.v-dialog > .v-card > .v-card__text {
  padding: 0 24px 0px;
}

.btn {
  font: normal 400 14px Roboto;
  letter-spacing: 0;
}
</style>