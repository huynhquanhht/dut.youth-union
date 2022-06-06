<template>
  <div class="error-info">
    <p class="error-code">403</p>
    <p class="error-title">Sorry, your access is denied</p>
    <div class="error-content">
      <p>You don't have permisson to access on this server.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDeniedAccess',
};
</script>

<style scoped>
.error-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.error-code {
  color: #507e8d;
  font: 700 54px Roboto;
  margin-bottom: 0px !important;
}

.error-title {
  color: #507e8d;
  font: 700 20px Roboto;
  margin-bottom: 8px !important;
}

.error-content {
  text-align: center;
}

.error-content p {
  color: #507e8d;
  font: 400 16px Roboto;
  width: 250px;
}
</style>
