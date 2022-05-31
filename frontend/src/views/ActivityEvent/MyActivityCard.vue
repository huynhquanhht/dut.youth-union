<template>
<div class="my-activity-card-wrapper">
  <div class="cover-block">
    <img class="cover" :src="activity.cover_url" alt="activity-cover">
  </div>
  <div class="info-block">
    <span class="activity-title"> {{ activity.name }} </span>
    <span class="activity-time"> {{ activity.startTimeText }} </span>
    <span class="activity-host"> {{ activity.organization_unit }} </span>
    <span class="registration-quantity"> {{ activity.students.length + ' đã đăng ký'}} </span>
  </div>
</div>
</template>

<script>
export default {
  name: "MyActivityCard",
  props: {
    activity: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style lang="scss" scoped>
.my-activity-card-wrapper {
  display: flex;
  column-gap: 8px;
  .cover-block {
    .cover {
      max-width: 180px;
      border-radius: 4px;
    }
  }

  .info-block {
    span {
      display: block;
    }

    .activity-title {
      font: normal 500 17px/20px Roboto;
    }

    .activity-time {
      font: normal 500 14px/20px Roboto;
    }

    .activity-host {
      font: normal 500 14px/20px Roboto;
      color: #828385;
    }

    .registration-quantity {
      font: normal 400 14px/20px Roboto;
      color: #828385;
    }
  }
}
</style>