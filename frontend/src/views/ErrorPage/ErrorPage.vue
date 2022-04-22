<template>
  <div className="error-page-wrapper" v-if="errorCode != ''">
    <div className="error-code">
      <span>{{ errorCode }}</span>
    </div>
    <div className="error-content">
      <span>{{ errorContent }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    errorType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      errorCode: '',
      errorContent: '',
    };
  },
  created() {
    switch(this.$route.name) {
      case 'error403':
        this.errorCode = '404';
        this.errorContent = 'The page you requested could not be found.';
        break;
      case 'error404':
        this.errorCode = '404';
        this.errorContent = 'The page you requested could not be found.';
        break;
      default:

    }
  },
};
</script>

<style lang="scss" scoped>
.error-page-wrapper {
  text-align: center;
  margin-top: 15%;

  .error-code {
    font: 500 100px;
    color: black;
  }

  .error-title {
    font: 300 32px;
    text-transform: uppercase;
    color: black;
  }

  .error-content {
    font: 300 20px;
    color: black;
  }
}
</style>
