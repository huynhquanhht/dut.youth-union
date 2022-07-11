<template>
  <v-app class="main-page-wrapper">
    <v-navigation-drawer
      fixed
      app
      permanent
      width="230px"
      src="@/assets/image/img-nav-drawer1.png"
      v-model="navDrawer"
      v-if="navDrawer"
      dark
      color="white"
    >
      <navigation-drawer />
    </v-navigation-drawer>
    <v-app-bar color="white" app dense class="app-bar-block">
      <app-bar
        height="100px"
        @show-nav-drawer="navDrawer = !navDrawer"
      ></app-bar>
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="fade">
          <router-view class="main-content"></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :bottom="true"
      :right="true"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large size="20">{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavigationDrawer from '@/components/NavigationDrawer';
import AppBar from '@/components/AppBar';
export default {
  name: 'main-page',
  components: {
    NavigationDrawer,
    AppBar,
  },
  data() {
    return {
      navDrawer: true,
    };
  },
  computed: {
  ...mapGetters({
    snackbar: 'getSnackbar',
  }),
}
};
</script>

<style lang="scss">
.require {
  color: red;
}
//.v-application .primary--text {
//  color: unset !important;
//  caret-color: unset !important;
//}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
.main-page-wrapper {
  .v-navigation-drawer__image {
    width: 120% !important;
    height: 120% !important;
    margin-left: -8px !important;
  }
  .app-bar-block {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25) !important;
    background-color: #ffffff !important;

    .v-toolbar__content {
      padding: 4px 8px !important;
    }
  }

  .v-main__wrap {
    background-color: #F6F6F6;
    max-width: unset !important;
  }

  .v-list-item__content {
    display: flex !important;

  }
}
</style>
