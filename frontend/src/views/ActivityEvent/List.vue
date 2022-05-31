<template>
  <div class="activity-event-wrapper">
<!--    <div class="main-title">HOẠT ĐỘNG, SỰ KIỆN</div>-->
    <your-activity/>
    <activity-exploration/>
  </div>
</template>

<script>
import ActivityExploration from "@/views/ActivityEvent/ActivityExploration";
import YourActivity from "@/views/ActivityEvent/MyActivity";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "List",
  components: {YourActivity, ActivityExploration },
  computed: {
    ...mapGetters({
      activityList: 'getActivityList'
    }),
  },
  methods: {
    ...mapActions({
      fetchGetActivityList: 'fetchGetActivityList',
    }),
  },
  async created() {
    await this.fetchGetActivityList();
    console.log(this.activityList);
  }
}
</script>

<style lang="scss" scoped>
.activity-event-wrapper {
  .main-title {
    font: normal 700 17px Roboto;
    color: #202124;
    margin-bottom: 16px;
  }
}
</style>