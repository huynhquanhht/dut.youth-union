<template>
  <div class="my-activity-wrapper">
    <div class="top-block">
      <span class="activity-exploration-title"> Hoạt động của bạn </span>
    </div>
    <v-divider></v-divider>
    <div class="activity-cards mt-4">
      <v-row v-if="!loading">
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="py-2 pr-2"
          v-for="(activity, index) in myActivities" :key="index">
          <div class="activity-card-block" @click="clickActivityCard(activity.id)">
            <my-activity-card :activity="activity"/>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          v-for="index in 10" :key="index">
          >
          <v-skeleton-loader
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import MyActivityCard from "@/views/ActivityEvent/MyActivityCard";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "MyActivity",
  components: {MyActivityCard},
  computed: {
    ...mapGetters({
      myActivities: 'getMyActivities',
    })
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      fetchGetActivitiesByCurrentStudent: 'fetchGetActivitiesByCurrentStudent',
    }),
    clickActivityCard(id) {
      console.log('abc');
      this.$router.push(`activity-event/${id}`);
    }
  },
  async created() {
    this.loading = true;
    await this.fetchGetActivitiesByCurrentStudent();
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.my-activity-wrapper {
  border-radius: 12px;
  //border: 1px solid #CED0D4;
  //box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 0px 16px 16px 16px;
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
    }

    .btn {
      letter-spacing: 0;
      font: normal 400 15px Roboto !important;
      text-transform: none;
      box-shadow: none;
      border-radius: 50px !important;
      height: 36px !important;
      border: none !important;
      //box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      background-color: #FFFFFF !important;
      border: 1px solid #CED0D4 !important;
      background: linear-gradient(180deg, #06b5e6 0%, #075cda 100%);
      color: #FFFFFF;
    }
    .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
      background-color: #E7F3FF !important;
      opacity: 1 !important;
      color: #188AF5 !important;
    }
    .v-btn-toggle > .v-btn.v-btn--active {
      color: #0E72E8 !important;
    }
  }
  .activity-cards {
    .activity-card-block {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background-color: #FFFFFF;
      padding: 12px;
      border-radius: 4px;
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