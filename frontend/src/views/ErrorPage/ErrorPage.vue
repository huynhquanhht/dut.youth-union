<template>
  <div class="wrapper">
    <div class="not-found-img">
      <img src="@/assets/image/icon-not-found.svg" alt="not-found-logo" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
};
</script>

<style scoped>
.not-found-img {
  width: 250px;
  position: relative;
  margin: auto;
  margin-top: 8%;
}
</style>
