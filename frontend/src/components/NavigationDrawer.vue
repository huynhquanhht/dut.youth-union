<template>
  <div class="navigation-drawer-wrapper">
    <div class="logo-block" @click="$router.push('/home')">
<!--      <img src="../assets/logo/logo-white-app.svg" alt="logo-app">-->
      <img src="../assets/logo/Asset2.png" alt="logo-app">
      <span>DutUnion</span>
    </div>
    <v-list nav dense>
      <v-list-group
        v-for="(navList, index) in navLists"
        :key="navList.name"
        no-action
        :append-icon="navList.lists ? 'mdi-menu-down' : ''"
        active-class="deep-white--text text--accent-4"
        :class="{'active': navList.active}"
      >
        <template v-slot:activator>
          <v-list-item active-class="deep-white--text text--accent-4" @click="changePage(navList.route, index)">
            <div class="item-group">
              <v-icon v-text="navList.icon"></v-icon>
              <span> {{ navList.name }}</span>
            </div>

          </v-list-item>
        </template>
<!--        <v-list-item-group class="white&#45;&#45;text" active-class="deep-white&#45;&#45;text text&#45;&#45;accent-4">-->
<!--          <v-list-item v-for="list in navList.lists" :key="list.name" :to="list.route">-->
<!--            <v-list-item-content>-->

<!--              <v-list-item-title>{{ list.name }}</v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--          </v-list-item>-->
<!--        </v-list-item-group>-->
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import localStorageUtils from '@/utils/local_storage';
import jwtDecode from 'jwt-decode';
export default {
  name: 'navigation-drawer',
  data() {
    return {
      navLists: [],
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetUserById: 'fetchGetUserById',
    }),
    changePage(link, index) {
      if (link) {
        this.navLists.forEach((item) => {
          item.active = false;
        });
        this.navLists[index].active = true;
        this.$router.push(link);
      }
    },
    clickListItem() {
      this.navLists.forEach((item) => {
        item.active = false;
      });
    }
  },
  async created() {
    this.currentUser = jwtDecode(localStorageUtils.getToken());
    await this.fetchGetUserById({ userId: this.currentUser.userId });
    if (this.user.roles[0].name === 'Quản trị viên') {
      this.navLists = [
        {
          name: 'Quản lý liên chi đoàn',
          icon: 'mdi-home-city',
          route: '/faculty',
          active: true,
        },
        {
          name: 'Quản lý chi đoàn',
          icon: 'mdi-bank',
          route: '/activity-class',
          active: false,
        },
        {
          name: 'Quản lý đoàn viên',
          icon: 'mdi-account-group',
          route: '/student',
          active: false,
        },
        {
          name: 'Quản lý hoạt động',
          icon: 'mdi-flag-variant',
          route: '/activity',
          active: false,
        },
        {
          name: 'Quản lý tin tức',
          icon: 'mdi-bullhorn ',
          route: '/news',
          active: false,
        },
        {
          name: 'Quản lý người dùng',
          icon: 'mdi-account-cog',
          route: '/user',
          active: false,
        },
        {
          name: 'Phân quyền',
          icon: 'mdi-lock-open',
          route: '/author',
          active: false,
        },
        {
          name: 'Nhóm tài khoản',
          icon: 'mdi-account-group',
          route: '/account-group',
          active: false,
        }
      ]
      // this.$router.push({ name: 'faculty'});
    }
    if (this.user.roles[0].name === 'Chuyên viên') {
      this.navLists = [
        {
          name: 'Quản lý liên chi đoàn',
          icon: 'mdi-home-city',
          route: '/faculty',
          active: true,
        },
        {
          name: 'Quản lý chi đoàn',
          icon: 'mdi-bank',
          route: '/activity-class',
          active: false,
        },
        {
          name: 'Quản lý đoàn viên',
          icon: 'mdi-account-group',
          route: '/student',
          active: false,
        },
        {
          name: 'Sổ tay đoàn viên',
          icon: 'mdi-notebook-multiple',
          route: '/union-textbook',
          active: false,
        },
        {
          name: 'Đoàn phí',
          icon: 'mdi-cash-multiple',
          route: '/union-fee',
          active: false,
        },
        {
          name: 'Quản lý hoạt động',
          icon: 'mdi-flag-variant',
          route: '/activity',
          active: false,
        }
      ];
      // this.$router.push({ name: 'faculty'});
    }
    if (this.user.roles[0].name === 'Ban thường vụ') {
      this.navLists = [
        {
          name: 'Quản lý liên chi đoàn',
          icon: 'mdi-home-city',
          route: '/faculty',
          active: true,
        },
        {
          name: 'Quản lý chi đoàn',
          icon: 'mdi-bank',
          route: '/activity-class',
          active: false,
        },
        {
          name: 'Quản lý đoàn viên',
          icon: 'mdi-home-city',
          route: '/student',
          active: false,
        },
        {
          name: 'Sổ tay đoàn viên',
          icon: 'mdi-notebook-multiple',
          route: '/union-textbook',
          active: false,
        },
        {
          name: 'Đoàn phí',
          icon: 'mdi-cash-multiple',
          route: '/union-fee',
          active: false,
        },
        {
          name: 'Quản lý hoạt động',
          icon: 'mdi-flag-variant',
          route: '/activity',
          active: false,
        }
      ];
      // this.$router.push({ name: 'faculty'});
    }
    if (this.user.roles[0].name === 'Bí thư liên chi đoàn') {
      this.navLists = [
        {
          name: 'Quản lý chi đoàn',
          icon: 'mdi-bank',
          route: '/activity-class',
          active: true,
        },
        {
          name: 'Quản lý đoàn viên',
          icon: 'mdi-account-group',
          route: '/student',
          active: false,
        },
        {
          name: 'Sổ tay đoàn viên',
          icon: 'mdi-notebook-multiple',
          route: '/union-textbook',
          active: false,
        },
        {
          name: 'Đoàn phí',
          icon: 'mdi-cash-multiple',
          route: '/union-fee',
          active: false,
        },
        {
          name: 'Quản lý hoạt động',
          icon: 'mdi-flag-variant',
          route: '/activity',
          active: false,
        }
      ];
      // this.$router.push({ name: 'activity-class-list'});
    }
    if (this.user.roles[0].name === 'Bí thư chi đoàn') {
      this.navLists = [
        {
          name: 'Quản lý đoàn viên',
          icon: 'mdi-account-group',
          route: '/student',
          active: true,
        },
        {
          name: 'Quản lý sổ tay đoàn viên',
          icon: 'mdi-notebook-multiple',
          route: '/union-textbook',
          active: false,
        },
        {
          name: 'Quản lý đoàn phí',
          icon: 'mdi-cash-multiple',
          route: '/union-fee-of-student',
          active: false,
        },
        {
          name: 'Thông tin đoàn phí',
          icon: 'mdi-cash-multiple',
          route: '/union-fee-of-student',
          active: false,
        },
        {
          name: 'Thông tin cá nhân',
          icon: 'mdi-flag-variant',
          route: '/profile-me',
          active: false,
        },
      ];
      // this.$router.push({ name: 'student-list'});
    }
    if (this.user.roles[0].name === 'Sinh viên') {
      this.navLists = [
        {
          name: 'Thông tin cá nhân',
          icon: 'mdi-account-box',
          route: '/profile-me',
          active: true,
        },
        {
          name: 'Đoàn phí',
          icon: 'mdi-cash-multiple',
          route: 'personal-union-fee',
          active: false,
        },
        {
          name: 'Hoạt động - Sự kiện',
          icon: 'mdi-flag-variant',
          route: '/activity-event',
          active: false,
        },
        {
          name: 'Điểm tích lũy',
          icon: 'mdi-clipboard-list-outline',
          route: '/accumulated-point',
          active: false,
        }
      ]
      // this.$router.push({ name: 'student-profile'});
    }
  }
};
</script>

<style lang="scss">
.navigation-drawer-wrapper {
  .v-icon {
    color: #FFFFFF !important;
  }
  .item-group {
    margin-left: 16px;
    display: flex;
    column-gap: 12px;
    align-items: center;
    span {
      font: normal 400 15px/15px Roboto;
      margin-top: 3px;
    }
  }
  .logo-block {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    background-color: #06b5e6;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    font: normal 500 21px Roboto;
    img {
      height: 36px;
    }
    span {
      margin-right:20px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .v-list-item {
    padding: 0px !important;
  }
  .v-list-item__icon:first-child {
    margin-right: 8px !important;
  }
  .v-list-group__header__append-icon {
    margin-left: 0px !important;
    min-width: unset !important;
  }
  .v-list-item__title {
    font: normal 400 14px Roboto !important;
  }
  .v-list--nav.v-list--dense .v-list-item:not(:last-child):not(:only-child) {
    margin: 0 !important;
  }
  .active {
    background-color: #42BAEC;
    border-radius: 4px;
    color: #FFFFFF !important;
  }
}
</style>
