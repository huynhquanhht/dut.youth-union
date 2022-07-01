<template>
  <div class="activity-exploration-wrapper">
    <div class="top-block">
      <span class="activity-exploration-title"> Khám phá sự kiện </span>
    </div>
    <v-divider></v-divider>
    <div class="nav-block">
      <v-btn-toggle
        class="btn-group"
        tile
        group
      >
        <v-btn class="btn"> Chung </v-btn>
        <v-btn class="btn"> Tuần này </v-btn>
        <v-btn class="btn"> Tháng này </v-btn>
        <v-btn class="btn"> Sắp diễn ra </v-btn>
        <v-btn class="btn"> Đang diễn ra </v-btn>
        <v-btn class="btn"> Khoa của bạn </v-btn>
      </v-btn-toggle>
    </div>
    <div class="activity-cards">
      <v-row v-if="!loading">
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            xl="3"
            class="pa-2 "
            v-for="(activity, index) in activityList.rows" :key="index">
            <div class="activity-card-block" @click="clickActivityCard(activity.id)">
              <activity-card :activity="activity"></activity-card>
            </div>
          </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="4"
          lg="4"
          xl="3"
          v-for="(activity, index) in activityList.rows" :key="index">
          <v-skeleton-loader
            v-bind="attrs"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ActivityCard from "@/views/ActivityEvent/ActivityCard";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ActivityExploration",
  components: {ActivityCard},
  computed: {
    ...mapGetters({
      activityList: 'getActivityList'
    }),
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      fetchGetActivityByOption: 'fetchGetActivityByOption',
    }),
    clickActivityCard(id) {
      this.$router.push(`activity-event/${id}`);
    }
  },
  async created() {
    this.loading = true;
    await this.fetchGetActivityByOption({option: 'Common'});
    this.loading = false;
    console.log(this.activityList);
  }
}
</script>

<style lang="scss">
.activity-exploration-wrapper {
  border-radius: 12px;
  //border: 1px solid #CED0D4;
  padding: 16px;
  .top-block {
    margin-bottom: 2px;
    .activity-exploration-title {
      font: normal 500 17px/20px Roboto;
      color: #020448;
    }
  }
  .v-divider {
    margin-bottom: 8px;
  }
  .nav-block {
    background-color: #FFFFFF;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 12px;
    border: 1px solid #CED0D4;
    .btn-group {
      display: flex;
      column-gap: 6px;
      .btn {
        letter-spacing: 0;
        font: normal 400 15px Roboto !important;
        text-transform: none;
        box-shadow: none;
        border-radius: 50px !important;
        height: 36px !important;
        border: none !important;
        //background-color: #FFFFFF !important;;
        border: 1px solid #CED0D4;
        color: #FFFFFF;
        //background-color: #0E72E8 !important;
        //background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%);
        background: linear-gradient(180deg, #06b5e6 0%, #075cda 100%);
        //background-size: 200% auto;
      }
    }
    .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
      background: linear-gradient(180deg, #0089b0 0%, #0461e7 100%);

      opacity: 1 !important;
      color: #FFFFFF !important;
    }
    .v-btn-toggle > .v-btn.v-btn--active {
      color: #FFFFFF !important;
    }
  }
  .activity-cards {
    max-width: 1200px;
    .activity-card-block {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      padding: 12px;
      border-radius: 4px;
      background-color: #FFFFFF;
      &:hover {
        transform: translateY(-4px);
        transition: 0.5s;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        cursor: pointer;
      }
      &:active {
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: rgba(white, 0.6);
          z-index: 2;
          transition: 0.5s;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>