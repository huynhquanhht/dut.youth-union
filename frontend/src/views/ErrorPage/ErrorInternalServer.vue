<template>
  <div class="error-info">
    <p class="error-code">500</p>
    <p class="error-title">Internal Server Error</p>
    <div class="error-content">
      <p>
        There is a problem with the resource you are looking for, and it can not be displayed.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorInternalServer',
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
  width: 280px;
}
</style>
