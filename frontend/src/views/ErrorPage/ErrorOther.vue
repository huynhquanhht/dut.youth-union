<template>
  <div class="error-info">
    <p class="error-title">Something went wrong</p>
    <div class="error-content">
      <p>Sorry, something went wrong there. Try again!</p>
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

.error-title {
  color: #507e8d;
  font: 700 20px Roboto;
  margin-bottom: 4px !important;
}

.error-content {
  text-align: center;
}

.error-content p {
  color: #507e8d;
  font: 400 16px Roboto;
  width: 360px;
}
</style>
