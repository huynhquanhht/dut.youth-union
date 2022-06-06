<template>
  <div class="error-info">
    <p class="error-code">404</p>
    <p class="error-title">Invalid token</p>
    <div class="error-content">
      <p>
        Your token is invalid or expired ! Please use the latest link to reset
        password !
      </p>
      <router-link to="/">Back to Home Page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorToken',
};
</script>

<style>
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
