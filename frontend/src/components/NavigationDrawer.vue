<template>
  <div class="navigation-drawer-wrapper">
    <div class="logo-block">
      <img src="../assets/logo/logo-white-app.svg" alt="logo-app">
    </div>
    <v-list nav dense>
      <v-list-group
        v-for="(navList, index) in navLists"
        :key="navList.name"
        :prepend-icon="navList.icon"
        no-action
        :append-icon="navList.lists ? 'mdi-menu-down' : ''"
        active-class="deep-white--text text--accent-4"
        :class="{'active': navList.active}"
      >
        <template v-slot:activator>
          <v-list-item-content active-class="primary" @click="changePage(navList.route, index)">
            <v-list-item-title active-class="deep-white--text text--accent-4">{{ navList.name }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group class="white--text" active-class="deep-white--text text--accent-4">
          <v-list-item v-for="list in navList.lists" :key="list.name" :to="list.route" @click="clickListItem">
            <v-list-item-icon class="pl-4">
              <v-icon v-text="list.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'navigation-drawer',
  data() {
    return {
      navLists: [
        {
          name: 'Quản lý đoàn cơ sở',
          icon: 'mdi-atlassian',
          active: null,
          lists: [
            {
              name: 'Quản lý liên chi đoàn',
              icon: 'mdi-manjaro',
              route: '/admin/association-union-branch',
            },
            {
              name: 'Quản lý chi đoàn',
              icon: 'mdi-bank',
              route: '/admin/union-branch'
            },
            {
              name: 'Quản lý sinh viên',
              icon: 'mdi-account-group',
              route: '/admin/union-member'
            },
          ],
        },
        {
          name: 'Quản lý hoạt động',
          icon: 'mdi-flag-variant',
          route: '/admin/activity',
          active: false,
        },
        {
          name: 'Quản lý thông báo',
          icon: 'mdi-bullhorn ',
          active: false,
        },
        {
          name: 'Quản lý người dùng',
          icon: 'mdi-account-cog',
          active: false,
        },
        {
          name: 'Quản lý hệ thống',
          icon: 'mdi-cogs',
          active: false,
        },
      ],
    };
  },
  methods: {
    changePage(link, index) {
      if (link) {
        this.navLists.forEach((item) => {
          item.active = false;
        })
        this.navLists[index].active = true;
        this.$router.push(link);
      }
    },
    clickListItem() {
      this.navLists.forEach((item) => {
        item.active = false;
      })
    }
  },
};
</script>

<style lang="scss">
.navigation-drawer-wrapper {
  .logo-block {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #06b5e6;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    img {
      height: 38px;
    }
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
  }
}
</style>
