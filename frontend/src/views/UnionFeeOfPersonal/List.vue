<template>
  <div class="union-fee-table-wrapper">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="unionFees && unionFees.rows ? unionFees.rows : []"
      :single-select="singleSelect"
      :items-per-page="selectedSize"
      scroll.sync="scrollSync"
      item-key="id"
      show-select
      :loading="loading"
      loading-text="Đang tải dữ liệu... Vui lòng chờ"
      class="union-fee-table"
      fixed-header
      hide-default-footer
    >
      <template v-if="unionFees && !unionFees.rows" v-slot:no-data>
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:top>
        <v-card-title>Quản lý đợt thu đoàn phí</v-card-title>
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
            <div class="tool-block d-flex">
              <v-btn
                text
                width="50px"
                class="tool-button"
                @click="save"
              >
                <v-icon dark size="20" class="mr-1">fa-save</v-icon>
                Lưu
              </v-btn>
              <v-btn
                text
                width="100px"
                class="tool-button"
                @click="confirm"
              >
                <v-icon dark size="20">mdi-checkbox-marked-circle-outline</v-icon>
                Xác nhận
              </v-btn>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.amount_of_money="{ item }">
        <span>{{ formatMoney(item.amount_of_money)}}</span>
      </template>
      <template v-slot:item.created_at="{ item }">
        <span>{{ formatTime(item.created_at)}}</span>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <span>{{ formatTime(item.updated_at)}}</span>
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
            v-if="unionFees && unionFees.count"
            :length="unionFees ? Math.ceil(unionFees.count / selectedSize) : 0"
            :totalVisible="totalVisible"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="confirmDialog" width="400px">
      <confirm-dialog
        :title="dialogTitle"
        :content="confirmDialogContent"
        persistent
        @confirm-dialog="processConfirmDialog"
        :loadingButton="loadingButton"
      ></confirm-dialog>
    </v-dialog>
    <div class="invoice">
      <div id="invoice-wrapper">
        <div class="top-wrapper">
          <div class="school">
            <div class="school-text">
              <span>ĐOÀN ĐẠI HỌC ĐÀ NẴNG</span>
              <span>ĐOÀN TRƯỜNG ĐẠI HỌC BÁCH KHOA</span>
            </div>
          </div>
        </div>
        <div class="middle-wrapper">
          <div class="title-bill">
            <span class="name-bill">PHIẾU THU<span class="id-bill value">Số: 001</span></span>
            <span class="date value">Ngày 03 tháng 05 năm 2021</span>
          </div>
          <div class="payer-info">
            <span class="key">Họ tên người nộp: <span class="value">Nguyễn Văn Linh</span></span>
            <span class="key">Mã sinh viên: <span class="value">102180112</span></span>
            <span class="key">Lớp: <span class="value">18TCLC_DT1</span></span>
            <span class="key">Khoa: <span class="value">Công nghệ thông tin</span></span>
            <span class="key">Lý do nộp: <span class="value">Đoàn phí (2021 - 2022)</span></span>
            <span class="key">Số tiền: <span class="value">24.000đ (Viết bằng chữ) Hai mươi bốn nghìn đồng y</span></span>
          </div>
          <div class="note-block">
            <span class="note-title">Ghi chú</span>
            <div class="note-frame"></div>
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="signature">
            <span class="people-action">Người lập phiếu</span>
            <span class="note">(Ký, họ tên)</span>
          </div>
          <div class="signature">
            <span class="people-action">Người nộp tiền</span>
            <span class="note">(Ký, họ tên)</span>
          </div>
          <div class="signature">
            <span class="people-action">Thủ quỹ</span>
            <span class="note">(Ký, họ tên)</span>
          </div>
          <div class="signature">
            <span class="people-action">Kế toán trưởng</span>
            <span class="note">(Ký, họ tên)</span>
          </div>
          <div class="signature">
            <span class="people-action">Thủ trưởng đơn vị</span>
            <span class="note">(Ký, họ tên)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import ConfirmDialog from '@/components/ConfirmDialog';
// import MESSAGE from '@/utils/message';
import timeUtils from "@/utils/time";
import moneyUtils from '@/utils/money';

export default {
  name: 'union-fee-list',
  components: {
    ConfirmDialog,
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
    className: {
      type: String,
      default: null,
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
      confirmDialog: false,
      formDialog: false,
      totalNumberOfItems: 0,
      listSize: [10, 50, 70, 100],
      selectedSize: 10,
      currentPage: this.page,
      totalVisible: 5,
      searchText: '',
      selectedOption: {},
      query: {},
      changedUnionTextbook: new Map(),
      command: '',
      loadingButton: false,
      searchOptions: [
        {
          name: 'Họ tên',
          attribute: 'name'
        },
        {
          name: 'Lớp sinh hoạt',
          attribute: 'className',
        },
      ],
      headers: [
        {text: 'Mã số', value: 'id',},
        {text: 'Năm học', value: 'school_year'},
        {text: 'Số tiền', value: 'amount_of_money'},
        {text: 'Ngày tạo', value: 'created_at',},
        {text: 'Ngày cập nhật', value: 'updated_at'},
      ],
      dialogTitle: null,
      dialogContent: null,
      confirmDialogContent: null,
    };
  },
  computed: {
    ...mapGetters({
      unionFees: 'getUnionFees',
    }),
  },

  methods: {
    ...mapActions({
      fetchGetUnionFees: 'fetchGetUnionFees',
      fetchUpdateUnionTextbooks: 'fetchUpdateUnionTextbooks',
      fetchConfirmSubmission: 'fetchConfirmSubmission',
    }),
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    async handlePageChange() {
      this.setQuery();
      await this.$router.push({
        name: 'union-fee-list',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetUnionFees(this.query);
      this.loading = false;
    },
    async changePageSize() {
      this.setQuery();
      await this.$router.push({
        name: 'union-fee-list',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetUnionFees(this.query);
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
        name: 'union-fee-list',
        query: query,
      }).catch(() => {});
      await this.fetchGetUnionFees(query);
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
    formatTime(time) {
      return timeUtils.convertDateTimeToDate(time);
    },
    checkSubmission(student) {
      console.log(student);
      this.changedUnionTextbook.set(student.union_textbook.id, student.union_textbook.submitted_union_textbook);
    },
    save() {
      this.command = 'Save';
      this.confirmDialogContent = "Bạn chắc chắn muốn lưu thông tin sổ đoàn đã chọn?"
      this.confirmDialog = true;
    },
    async processConfirmDialog(command) {
      console.log(command);
      if (command === 'Ok') {
        console.log('mmm');
        console.log(this.command)
        if (this.command == 'Save') {
          const changedUnionTextbook = Array.from(this.changedUnionTextbook, ([key, value]) => {
            return { id: key, submitted: value };
          });
          this.loadingButton = true;
          let isSuccess = await this.fetchUpdateUnionTextbooks({changedUnionTextbook});
          this.loadingButton = false;
          if (isSuccess) {
            this.confirmDialog = false;
            await this.fetchGetUnionFees(this.query);
          }
        }
        if (this.command == 'Confirm') {
          const unionTextbookIds = this.selected.map(item => item.union_textbook.id);
          this.loadingButton = true;
          let isSuccess = await this.fetchConfirmSubmission({unionTextbookIds});
          this.loadingButton = false;
          if (isSuccess) {
            this.confirmDialog = false;
            await this.fetchGetUnionFees(this.query);
          }
        }
        return;
      }
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
    },
    confirm() {
      this.command = 'Confirm';
      this.confirmDialogContent = "Bạn chắc chắn muốn lưu thông tin sổ đoàn đã chọn?"
      this.confirmDialog = true;
    },
    formatMoney(money) {
      return moneyUtils.formatVND(money);
    }
  },
  async created() {
    this.setQuery();
    this.loading = true;
    await this.fetchGetUnionFees(this.query);
    this.loading = false;
  },
};
</script>

<style lang="scss">
.union-fee-table-wrapper {
  border-radius: 8px !important;
  .union-fee-table {
    background-color: #FFFFFF !important;
    padding: 20px 20px 20px 20px;
    border-radius: 8px !important;
    height: 100vh;
    .v-card__title {
      padding: 4px 0px 8px 0px !important;
      font: normal 700 8px Roboto;
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
      //border-radius: 8px !important;

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
                //padding: 0px 8px;
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


              //&:nth-child(1) {
              //  min-width: 20px !important;
              //  padding: 0px 8px;
              //}
              //
              //&:nth-child(2) {
              //  min-width: 100px !important;
              //}
              //
              //&:nth-child(3) {
              //  min-width: 200px !important;
              //}
              //
              //&:nth-child(4) {
              //  min-width: 100px !important;
              //}
              //
              //&:nth-child(5) {
              //  min-width: 120px !important;
              //}
              //
              //&:nth-child(6) {
              //  min-width: 120px !important;
              //}
              //
              //&:nth-child(7) {
              //  min-width: 130px !important;
              //}
              //
              //&:nth-child(8) {
              //  min-width: 300px !important;
              //}
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
}
</style>