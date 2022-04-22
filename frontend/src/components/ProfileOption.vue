<template>
  <v-menu
      bottom
      min-width="200px"
      rounded
      offset-y
      class="profile-option-wrapper"
  >
    <template v-slot:activator="{ on }">
      <v-btn width="40px" height="40px" icon v-on="on">
        <v-avatar width="36px" height="36px">
          <img src="../assets/image/default-avatar.png"
               class="img-avatar">
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="profile-info-block">
      <v-list-item-content class="justify-center profile-info">
        <div class="text-center profile-menu">
          <!--          <p class="fullname">{{ currentUser.name }}</p>-->
          <!--          <p class="email">-->
          <!--            {{ currentUser.email }}-->
          <!--          </p>-->
          <v-divider class="mt-2"></v-divider>
          <v-btn class="option-btn" text width="100%">Thông tin cá nhân</v-btn>
          <v-divider></v-divider>
          <v-btn class="option-btn" text width="100%">Đổi mật khẩu</v-btn>
          <v-divider></v-divider>
          <v-btn class="option-btn" text width="100%" @click="logout">
            Đăng xuất
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import localStorageUtils from '@/utils/local_storage';

export default {
  name: 'ProfileOption',
  props: {
    currentUser: {
      type: Object,
    },
  },
  methods: {
    logout() {
      localStorageUtils.clearAll();
      this.$router.push('/login');
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
.profile-option-wrapper {
  box-shadow: none !important;

  .v-btn--icon {
    .v-size--default {
      width: 36px !important;
      height: 36px !important;
    }
  }

  .v-menu__content {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important;
  }
}
.profile-info-block {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
  rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
  .profile-info {
    .profile-menu {
      .fullname {
        font: normal 500 16px Roboto !important;
        color: #616161 !important;
      }

      .email {
        font: normal 300 13px Roboto;
        color: #616161;
        margin-top: 4px;
      }

      .option-btn {
        text-transform: none;
        font: normal 400 15px Roboto;
        letter-spacing: 0;
        border-radius: unset;
      }
    }
  }
}
</style>
