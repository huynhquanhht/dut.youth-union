<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="registeredList ? registeredList.students : []"
      :single-select="singleSelect"
      :items-per-page="selectedSize"
      scroll.sync="scrollSync"
      item-key="id"
      show-select
      loading-text="Đang tải dữ liệu... Vui lòng chờ"
      :loading="loading"
      class="activity-table"
      fixed-header
      hide-default-footer
    >
      <template v-if="registeredList && !registeredList.students" v-slot:no-data>
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:top>
        <v-card-title>DANH SÁCH ĐĂNG KÝ HOẠT ĐỘNG {{ activity.name }}</v-card-title>
        <div class="toolbar mb-1" flat>
          <div class="toolbar-block">
            <div class="search-block d-flex">
              <v-select
                filled
                label="Tìm kiếm theo"
                class="search-select mr-2"
                :items="searchOptions"
                item-text="name"
                hide-details="false"
                v-model="selectedOption"
                solo
                dense
              ></v-select>
              <v-text-field
                solo
                dense
                filled
                prepend-inner-icon="mdi-magnify"
                hide-details="false"
                class="input-search"
                @keyup.enter="search"
                v-model="searchText"
                :disabled="!selectedOption"
              ></v-text-field>
            </div>
            <div class="tool-block d-flex align-center">
              <v-btn
                icon
                width="170px"
                class="tool-button"
                @click="registerDialog = true"
              >
                <v-icon dark size="24">mdi-plus</v-icon>
                Thêm người tham gia
              </v-btn>
              <v-btn
                text
                width="50px"
                class="tool-button"
                @click="deleteParticipants"
              >
                <v-icon dark size="20">mdi-trash-can-outline</v-icon>
                Xóa
              </v-btn>
              <v-btn
                icon
                width="110px"
                class="tool-button"
                @click="attendParticipant"
              >
                <v-icon dark size="22">mdi-format-list-bulleted-square</v-icon>
                Điểm danh
              </v-btn>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.register_join.registered_at="{ item }">
        <span>
          {{item.register_join.registered_at ? timeUtils.formatTime(item.register_join.registered_at) : '-' }}
        </span>
      </template>
      <template v-slot:item.register_join.attended_at="{ item }">
        <span>
          {{item.register_join.attended_at ? timeUtils.formatTime(item.register_join.attended_at) : '-' }}
        </span>
      </template>
      <template v-slot:footer>
        <div
          class="footer-block pagination-block d-flex align-center justify-end mt-2"
        >
          <div class="selected-row-block pagi-info d-flex align-center">
            <span>Hiển thị:</span>
            <v-select
              filled
              solo
              dense
              hide-details="false"
              v-model="selectedSize"
              class="row-count-select"
              :items="listSize"
              item-text="name"
              @change="changePageSize"
              return-object
              single-line
            ></v-select>
          </div>
          <v-pagination
            v-if="activityList.count > selectedSize"
            v-model="currentPage"
            :length="
               activityList ? Math.ceil(activityList.count / selectedSize) : 0
            "
            :totalVisible="totalVisible"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="registerDialog" width="360px">
      <register-form
        @register-form="registerFormHandler"/>
    </v-dialog>
    <v-dialog v-model="confirmDialog" width="400px">
      <confirm-dialog
        @confirm-dialog="handleConfirm"
        :title="dialogTitle"
        :content="dialogContent"
      ></confirm-dialog>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import ConfirmDialog from '@/components/ConfirmDialog';
import MESSAGE from '@/utils/message';
import jwt from 'jsonwebtoken';
import RegisterForm from '@/views/RegisterJoin/Form';
import time from '@/utils/time';

export default {
  name: 'activity-list',
  components: {
    ConfirmDialog,
    RegisterForm
  },
  props: {
    page: {
      type: Number,
      default: 1,
      validator: (val) => (!val ? 1 : val),
    },
    size: {
      type: Number,
      validator: (val) => ([10, 50, 70, 100].indexOf(val) >= 0 ? val : 10),
    },
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      singleSelect: false,
      selected: [],
      loading: false,
      dialog: false,
      formDialog: false,
      QRCodeDialog: false,
      totalNumberOfItems: 0,
      listSize: [10, 50, 70, 100],
      selectedSize: 10,
      currentPage: this.page,
      totalVisible: 5,
      searchText: '',
      selectedOption: {},
      searchOptions: [
        {
          name: 'Mã số',
          attribute: 'id'
        },
        {
          name: 'Tên hoạt động',
          attribute: 'name',
        }],
      headers: [
        {
          text: 'Mã sinh viên',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'Họ tên', value: 'name'},
        {text: 'Lớp', value: 'activity_class.name'},
        {text: 'Khoa', value: 'activity_class.faculty.name'},
        {text: 'Đăng ký lúc', value: 'register_join.registered_at'},
        {text: 'Điểm danh', value: 'register_join.attended_at'},
      ],
      dialogTitle: null,
      dialogContent: null,
      query: {},
      action: '',
      qrData: null,
      registerDialog: false,
      confirmDialog: false,
      timeUtils: time,
    };
  },
  computed: {
    ...mapGetters({
      activityList: 'getActivityList',
      activity: 'getActivity',
      registeredList: 'getRegisteredList',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetAllActivity: 'fetchGetAllActivity',
      fetchDeleteActivities: 'fetchDeleteActivities',
      fetchGetActivityById: 'fetchGetActivityById',
      fetchGetRegisteredListById: 'fetchGetRegisteredListById',
      fetchAddParticipant: 'fetchAddParticipant',
      fetchAttendParticipants: 'fetchAttendParticipants',
      fetchDeleteParticipants: 'fetchDeleteParticipants',
    }),
    ...mapMutations({
      setActivityPage: 'setActivityPage',
      setActivitySize: 'setActivitySize',
      setSnackbar: 'setSnackbar',
    }),
    async handleConfirm(command) {
      if (command === 'Ok') {
        if (this.action === 'Delete') {
          const registrationIds = this.selected.map((registration) => registration.register_join.id);
          let deleteResult = await this.fetchDeleteParticipants({registrationIds: registrationIds});
          if (deleteResult) {
            this.selected = [];
            this.setQuery();
            await this.fetchGetRegisteredListById({
              activityId: this.$route.params.id,
              query: this.query,
            });
          }
          this.selected = [];
          this.confirmDialog = false;
          return;
        }
        if (this.action === 'Attend') {
          let isAttended = await this.fetchAttendParticipants({
            registrationIds: this.selected[0].register_join.id,
          });
          if (isAttended) {
            await this.fetchGetRegisteredListById({
              activityId: this.$route.params.id,
              query: this.query,
            });
          }
          this.selected = [];
          this.confirmDialog = false;
          return;
        }
      }
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
    },
    async attendParticipant() {
      if (this.selected.length !== 1) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_ONE_RECORD_FOR_EXCUTION,
        });
        return;
      }
      this.action = 'Attend';
      this.dialogTitle = 'Điểm danh sinh viên';
      this.dialogContent = 'Bạn chắc chắn muốn điểm danh sinh viên đã chọn?';
      this.confirmDialog = true;
    },
    async registerFormHandler(data) {
      if (data.command === 'save') {
        const studentId = data.id;
        const activityId = this.$route.params.id;
        const isCreated = await this.fetchAddParticipant({
          participantInfo: { studentId, activityId },
        });
        if (isCreated) {
          await this.fetchGetAllActivity(this.query);
          await this.fetchGetRegisteredListById({
            activityId: activityId,
            query: this.query,
          });
        }
        this.registerDialog = false;
      }
      if (data.command === 'close') {
        this.registerDialog = false;
      }
    },
    async handlePageChange() {
      this.setQuery();
      this.$router.push({
        name: 'activity-list',
        query: this.query,
      }).catch(() => {
      });
      this.loading = true;
      await this.fetchGetAllActivity(this.query);
      this.loading = false;
    },
    async changePageSize() {
      this.setQuery();
      this.$router.push({
        name: 'activity-list',
        query: this.query,
      }).catch(() => {
      });
      this.loading = true;
      await this.fetchGetAllActivity(this.query);
      this.loading = false;
    },
    async deleteParticipants() {
      if (this.selected.length === 0) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_RECORD_FOR_DELETE,
        });
        return;
      }
      this.action = 'Delete';
      this.dialogTitle = 'Xác nhận xóa';
      this.dialogContent = 'Bạn chắc chắn muốn xóa?';
      this.confirmDialog = true;
    },
    async search() {
      let query = {};
      this.searchOptions.forEach(option => {
        if (option.name === this.selectedOption) {
          query[option.attribute] = this.searchText;
        }
      });
      query.page = 1;
      query.size = 10;
      this.$router.push({
        name: 'activity-list',
        query: query,
      }).catch(() => {
      });
      await this.fetchGetAllActivity(query);
    },
    setQuery() {
      this.searchOptions.forEach(option => {
        if (option.attribute in this.query) {
          delete this.query[option.attribute];
        }
        if (option.name === this.selectedOption) {
          this.query[option.attribute] = this.searchText;
        }
      });
      this.query.page = this.currentPage;
      this.query.size = this.selectedSize;
    },
    async showQR() {
      if (this.selected.length !== 1) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_ONE_RECORD_FOR_EXCUTION,
        });
        return;
      }
      const payload = {
        activityId: this.selected[0].id,
        activityName: this.selected[0].name,
      };
      console.log(process.env.VUE_APP_QR_KEY);
      const qrCode = await jwt.sign(payload, process.env.VUE_APP_QR_KEY, {
        expiresIn: process.env.VUE_APP_TOKEN_TIMEOUT,
      });
      this.qrData = {
        activityId: this.selected[0].id,
        activityName: this.selected[0].name,
        code: qrCode,
      };
      this.QRCodeDialog = true;
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.fetchGetActivityById({id: id});

    for (let props in this.$props) {
      if (props === 'id' && this[props]) {
        this.selectedOption = this.searchOptions.find(option => option.attribute === 'id').name;
        this.searchText = this[props];
      }
      if (props === 'name' && this[props]) {
        this.selectedOption = this.searchOptions.find(option => option.attribute === 'name').name;
        this.searchText = this[props];
      }
    }
    this.setQuery();
    await this.fetchGetAllActivity(this.query);
    await this.fetchGetRegisteredListById({
      activityId: id,
      query: this.query,
    });
    this.loading = false;
  },
  beforeDestroy() {
    this.setActivityPage(this.page);
    this.setActivitySize(this.size);
  },
};
</script>

<style lang="scss">
.activity-table {
  //overflow: auto;
  height: 100vh;
  background-color: #FFFFFF !important;
  padding: 20px 20px 20px 20px;
  border-radius: 8px !important;
  .v-card__title {
    padding: 4px 0px 8px 0px !important;
    font: normal 700 18px Roboto;
    text-shadow: rgb(0 0 0 / 12%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
    color: #0b8ee7;
    text-transform: uppercase;
  }

  .toolbar-block {
    width: 100%;
    display: flex !important;
    justify-content: space-between;

    .divider-text {
      font-size: 20px;
      color: #616161;
      margin: 0px 4px;
    }

    .tool-block {
      .tool-button {
        letter-spacing: 0;
        text-transform: none;
        color: #323130;
        font: normal 400 14px Roboto;
        border-radius: 4px;
        height: 34px !important;

        .v-icon {
          color: #0078D4 !important;
        }
      }
    }
  }

  .v-toolbar__content {
    padding: 4px 0px !important;
  }

  .search-block {
    .search-select {
      width: 160px !important;
      height: 28px !important;
      font: normal 400 15px Roboto !important;
    }

    .v-input__slot {
      min-height: 32px !important;
      padding: 0px 0px 0px 8px !important;
      box-shadow: none !important;
      border: 1px solid #d9d9d9 !important;
    }

    .v-label {
      font: normal 400 14px Roboto !important;
      top: 7px !important;

      .v-select__selections {
        font: normal 400 14px Roboto !important;
      }
    }

    .v-text-field__slot {
      font: normal 400 14px Roboto !important;
      margin-top: 1px;
    }

    .v-icon {
      font-size: 20px !important;
      margin-top: 1px;
    }
  }

  .v-divider {
    display: none;
  }

  .v-data-table__wrapper {
    max-height: calc(100vh - 180px) !important;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    //height: 400px !important;
    border-radius: 8px !important;

    table {
      border-radius: 8px !important;

      thead {
        tr {
          th {
            vertical-align: middle !important;
            background-color: #0b8ee7 !important;
            color: #FFFFFF !important;
            position: sticky !important;
            height: 40px !important;
            font: normal 500 14px Roboto !important;

            .v-input--selection-controls__input {
              .v-icon {
                font-size: 20px !important;
                color: #FFFFFF;
              }
            }

            .v-data-table-header__icon {
              color: #FFFFFF !important;
              margin-bottom: 4px !important;
            }

            &:first-child {
              padding: 0px 8px;
              border-top-left-radius: 8px !important;
            }

            &:last-child {
              border-top-right-radius: 8px !important;
            }
          }
        }

        .v-data-table__progress {
          th {
            background-color: #FFFFFF !important;
          }
        }
      }

      tbody {
        tr {
          td {
            height: 40px !important;
            font: normal 400 14px Roboto !important;
            .v-input--selection-controls__input {
              .v-icon {
                font-size: 20px !important;
              }
            }

            &:nth-child(1) {
              min-width: 20px !important;
              padding: 0px 8px;
            }

            &:nth-child(2) {
              min-width: 80px !important;
            }

            &:nth-child(3) {
              min-width: 200px !important;
            }

            &:nth-child(4) {
              min-width: 200px !important;
            }

            &:nth-child(5) {
              min-width: 200px !important;
            }

            &:nth-child(6) {
              min-width: 100px !important;
            }

            &:nth-child(7) {
              min-width: 100px !important;
            }

            &:nth-child(8) {
              min-width: 120px !important;
            }

            &:nth-child(9) {
              min-width: 100px !important;
            }
          }

          &:hover {
            td {
              color: #0b8ee7 !important;
            }
          }
        }
      }
    }

    &::-webkit-scrollbar-track {
      background-color: #BAD2EC;
    }

    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
      background-color: #BAD2EC;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #0B8EE7;
    }
  }

  .pagination-block {
    display: flex;
  }

  .v-pagination {
    li {
      &:first-child, &:last-child {
        button {
          padding: 0px;
          margin: 2px !important;
          width: 30px !important;
          height: 30px !important;
          box-shadow: none;

          i {
            color: #0078D4 !important;
          }

          &:hover {
            background-color: #EFEFEF !important;
          }

          &:active {
            background-color: #A7A7A6 !important;
          }
        }
      }
    }
  }

  .v-pagination__more {
    margin: 2px 0px !important;
    width: 30px !important;
    color: #0078D4 !important;
    box-shadow: none;
  }

  .v-pagination__item {
    font: normal 400 14px Roboto;
    color: #0078D4 !important;
    width: 30px !important;
    height: 30px !important;
    min-width: 30px !important;
    padding: 0px !important;
    margin: 2px !important;
    box-shadow: none;

    &:hover {
      background-color: #EFEFEF !important;
    }

    &:active {
      background-color: #A7A7A6 !important;
    }
  }

  .v-pagination__item--active {
    background-color: #FFFFFF !important;
    color: #0078D4 !important;
    border: 1px solid #0078D4 !important;

    &:hover {
      background-color: #EFEFEF !important;
    }

    &:active {
      background-color: #A7A7A6 !important;
    }
  }

  .pagi-info {
    font: normal 400 14px Roboto;
  }

  .selected-row-block {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    column-gap: 5px;
  }

  .row-count-select {
    width: 64px;
    font: normal 400 14px Roboto !important;

    .v-input__slot {
      min-height: unset !important;
      padding: 0px 0px 0px 8px !important;
      box-shadow: none !important;
      border: 1px solid #d9d9d9 !important;
      margin-top: 5px !important;
    }
  }
}
</style>