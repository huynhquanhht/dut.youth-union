<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="activityClassList && activityClassList.rows ? activityClassList.rows : []"
      :single-select="singleSelect"
      :items-per-page="selectedSize"
      scroll.sync="scrollSync"
      item-key="id"
      show-select
      :loading="loading"
      loading-text="Đang tải dữ liệu... Vui lòng chờ"
      class="activity-class-table"
      fixed-header
      hide-default-footer
      @click:row="clickActivityClass"
    >
      <template v-if="activityClassList && activityClassList.rows && !activityClassList.rows.length" v-slot:no-data>
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:top>
        <v-card-title>QUẢN LÝ CHI ĐOÀN</v-card-title>
        <div class="toolbar mb-1" flat>
          <div class="toolbar-block">
            <div class="search-block d-flex">
              <v-select
                filled
                label="Tìm kiếm theo"
                class="search-select mr-2"
                hide-details="false"
                :items="searchOptions"
                item-text="name"
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
            <div class="tool-block d-flex" v-if="currentUser.roles[0].name !== roleUtils.FACULTY_SECRETARY">
              <v-btn
                text
                width="100px"
                class="tool-button"
                @click="csvDialog = true"
              >
                <v-icon dark size="22">fas fa-file-csv</v-icon>
                <span class="ml-1">Nhập CSV</span>
              </v-btn>
              <v-btn
                  text
                  width="100px"
                  class="tool-button"
                  @click="create"
              >
                <v-icon dark class="mr-1" size="24">mdi-plus</v-icon>
                Thêm mới
              </v-btn>
              <v-btn
                  text
                  width="100px"
                  class="tool-button"
                  @click="update"
              >
                <v-icon dark size="20">mdi-square-edit-outline</v-icon>
                Chỉnh sửa
              </v-btn>
              <v-btn
                  text
                  width="50px"
                  class="tool-button"
                  @click="deleteActivityClass"
              >
                <v-icon dark size="20">mdi-trash-can-outline</v-icon>
                Xóa
              </v-btn>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
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
                @change="changePageSize"
            ></v-select>
          </div>
          <v-pagination
              v-model="currentPage"
              :length="
              activityClassList ? Math.ceil(activityClassList.count / selectedSize) : 0
            "
              :totalVisible="totalVisible"
              @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="confirmDialog" width="400px">
      <confirm-dialog
        @confirm-dialog="handleConfirm"
        :title="dialogTitle"
        :content="dialogContent"
      ></confirm-dialog>
    </v-dialog>
    <v-dialog
      v-model="csvDialog"
      width="400px"
      persistent
    >
      <csv-popup
        @csv-dialog="csvDialogHandler"
        :btnOkLoading="btnOkLoading"
      />
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import CsvPopup from '@/components/CSVPopup';
import ConfirmDialog from '@/components/ConfirmDialog';
import MESSAGE from "@/utils/message";
import role from '@/utils/role';
export default {
  name: 'activity-class-list',
  components: { CsvPopup, ConfirmDialog, },
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
    name: {
      type: String,
      default: null,
    },
    courseName: {
      type: String,
      default: null,
    },
    facultyName: {
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
      totalNumberOfItems: 0,
      listSize: [10, 50, 70, 100],
      selectedSize: 10,
      currentPage: this.page,
      totalVisible: 5,
      searchText: '',
      selectedOption: {},
      query: {},
      roleUtils: role,
      searchOptions: [
        {
          name: 'Tên chi đoàn',
          attribute: 'name'
        },
        {
          name: 'Tên khóa',
          attribute: 'courseName',
        },
        {
          name: 'Tên khoa',
          attribute: 'facultyName',
        },
      ],
      headers: [
        {
          text: 'Mã số',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Chi đoàn', value: 'name' },
        { text: 'Khóa', value: 'course.name' },
        { text: 'Khoa', value: 'faculty.name' },
        { text: 'Sỉ số', value: 'studentQuantity'},
        { text: 'Đoàn viên', value: 'unionMemberQuantity'},
        { text: 'Nộp sổ đoàn', value: 'unionTextbookQuantity'},
      ],
      dialogTitle: null,
      dialogContent: null,
      csvDialog: false,
      btnOkLoading: false,
      confirmDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      activityClassList: 'getActivityClassList',
      currentUser: 'getUser',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetActivityClassList: 'fetchGetActivityClassList',
      fetchUploadActivityClassCSV: 'fetchUploadActivityClassCSV',
      fetchDeleteActivityClass: 'fetchDeleteActivityClass',
    }),
    ...mapMutations({
      setSnackbar: 'setSnackbar'
    }),
    async handlePageChange() {
      this.setQuery();
      await this.$router.push({
        name: 'activity-class-list',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetActivityClassList(this.query);
      this.loading = false;
    },
    async changePageSize() {
      this.currentPage = 1;
      this.setQuery();
      await this.$router.push({
        name: 'activity-class-list',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetActivityClassList(this.query);
      this.loading = false;
    },
    processDialog(payload) {
      if (payload.command === 'Cancel') {
        this.formDialog = false;
      }
      if (payload.command === 'Save') {
        this.formDialog = false;
      }
    },
    async search() {
      let query = {};
      this.searchOptions.forEach(option => {
        if (option.name === this.selectedOption) {
          query[option.attribute] = this.searchText;
        }
      });
      this.currentPage = 1;
      this.selectedSize = 10;
      query.page = 1;
      query.size = 10;
      this.$router.push({
        name: 'activity-class-list',
        query: query,
      }).catch(() => {});
      await this.fetchGetActivityClassList(query);
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
    async csvDialogHandler(data) {
      console.log('data - ', data);
      if (data.command === 'Ok') {
        this.btnOkLoading = true;
        let activityClassFormData = new FormData();
        activityClassFormData.append('file', data.file);
        let isCreated = await this.fetchUploadActivityClassCSV({ file: activityClassFormData });
        this.btnOkLoading = false;
        this.csvDialog = false;
        if (isCreated) {
          await this.fetchGetActivityClassList(this.query);
        }
      }
      if (data.command === 'Cancel') {
        this.csvDialog = false;
      }
    },
    create() {
      this.setSnackbar({
        type: 'info',
        visible: true,
        text: MESSAGE.FEATURE_DEVELOP,
      });
    },
    update() {
      this.setSnackbar({
        type: 'info',
        visible: true,
        text: MESSAGE.FEATURE_DEVELOP,
      });
    },
    async deleteActivityClass() {
      if (this.selected.length !== 1) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_ONE_RECORD_FOR_EDIT,
        });
        return;
      }
      this.dialogTitle = 'Xác nhận xóa';
      this.dialogContent = 'Bạn chắc chắn muốn xóa?';
      this.confirmDialog = true;
    },
    async handleConfirm(command) {
      if (command === 'Ok') {
        let deleteResult = await this.fetchDeleteActivityClass({activityClassId: this.selected[0].id});
        if (deleteResult) {
          this.selected = [];
          this.setQuery();
          await this.fetchGetActivityClassList(this.query);
        }
        this.confirmDialog = false;
      }
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
    },
    clickActivityClass(e) {
      this.$router.push({ name: 'student-list', query: {activityClassId: e.id}})
    }
  },
  async created() {
    this.setQuery();
    this.loading = true;
    await this.fetchGetActivityClassList(this.query);
    this.loading = false;
  },
};
</script>

<style lang="scss">
.activity-class-table {
  padding: 20px 20px 20px 20px;
  border-radius: 8px !important;
  background-color: #FFFFFF !important;
  .v-card__title {
    padding: 4px 0px 8px 0px !important;
    font: normal 700 18px Roboto;
    text-shadow: rgb(0 0 0 / 12%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
    color: #0b8ee7;
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
      //margin-top: 1px;
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
            background-color: #0b8ee7 !important;
            color: #FFFFFF !important;
            position: sticky !important;
            height: 40px !important;
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
              min-width: 100px !important;
            }

            &:nth-child(3) {
              min-width: 100px !important;
            }

            &:nth-child(4) {
              min-width: 100px !important;
            }

            &:nth-child(5) {
              min-width: 200px !important;
            }

            &:nth-child(6) {
              min-width: 120px !important;
            }

            &:nth-child(7) {
              min-width: 120px !important;
            }

            &:nth-child(8) {
              min-width: 120px !important;
            }

            &:nth-child(9) {
              min-width: 200px !important;
            }

            &:nth-child(10) {
              min-width: 120px !important;
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