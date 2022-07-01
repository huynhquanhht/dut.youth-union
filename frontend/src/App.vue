<template>
  <Transition name="fade">
  <router-view></router-view>
  </Transition>
</template>

<script>

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default {
  name: 'app',
};
</script>
<style>
html {
  /*overflow: hidden !important;*/
}
.v-application p {
  margin-bottom: 0px !important;
  line-height: 0px !important;
}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
