<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ content }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="red darken-1"
          text
          @click="$emit('confirm-dialog', 'Ok')"
      >
        Hủy
      </v-btn>
      <v-btn
          color="blue darken-1"
          text
          @click="$emit('confirm-dialog', 'Cancel')"
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
    }
  }
}
</script>

<style scoped>

</style>