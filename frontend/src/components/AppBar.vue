<template>
  <div class="app-bar-wrapper">
    <v-app-bar-nav-icon
      width="40px"
      height="40px"
      color="#06B5E6"
      @click="showNavDrawer"
    ></v-app-bar-nav-icon>
    <profile-option :currentUser="currentUser" />
  </div>
</template>

<script>
import ProfileOption from './ProfileOption.vue';
import localStorageUtils from '@/utils/local_storage';
export default {
  components: { ProfileOption },
  name: 'AppBar',
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    showNavDrawer() {
      this.$emit('show-nav-drawer');
    },
  },
  created() {
    this.currentUser = localStorageUtils.getService().getCurrentUser();
  },
};
</script>

<style lang="scss" scoped>
.app-bar-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
