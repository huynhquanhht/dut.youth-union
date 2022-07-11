<template>
  <div class="union-fee-of-student-table-wrapper">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="unionFeeOfStudents && unionFeeOfStudents.rows ? unionFeeOfStudents.rows : []"
      :single-select="singleSelect"
      :items-per-page="selectedSize"
      scroll.sync="scrollSync"
      item-key="id"
      show-select
      :loading="loading"
      loading-text="Đang tải dữ liệu... Vui lòng chờ"
      class="union-fee-of-student-table"
      fixed-header
      hide-default-footer
    >
      <template v-if="unionFeeOfStudents && !unionFeeOfStudents.rows" v-slot:no-data>
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:top>
        <v-card-title>QUẢN LÝ ĐOÀN PHÍ </v-card-title>
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
                return-object
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
                width="124px"
                class="tool-button"
                @click="collectionPeriodDialog = true"
              >
                <v-icon dark size="20" class="mr-1">mdi-hand-coin</v-icon>
                Tạo đợt thu
              </v-btn>
              <v-btn
                text
                width="124px"
                class="tool-button"
                @click="printInvoice"
              >
                <v-icon dark size="20" class="mr-1">fa-file-invoice-dollar</v-icon>
                Xuất hóa đơn
              </v-btn>
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
      <!--      <template v-slot:item.data-table-select="{ item}">-->
      <!--        <v-simple-checkbox-->
      <!--          :readonly="item.union_textbook.class_confirmed"-->
      <!--        ></v-simple-checkbox>-->
      <!--      </template>-->
      <template v-slot:item.unionFee.submit_union_fee.submitted="{ item }">
        <v-simple-checkbox
          color="info"
          v-model="item.unionFee.submit_union_fee.submitted"
          @click="checkSubmission(item)"
          :key="item.id"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.unionFee.submit_union_fee.submitted_at="{ item }">
        <span>{{ formatTime(item.unionFee.submit_union_fee.submitted_at)}}</span>
      </template>
      <template v-slot:item.unionFee.submit_union_fee.class_confirmed="{ item }">
        <span>{{ formatTime(item.unionFee.submit_union_fee.class_confirmed)}}</span>
      </template>
      <template v-slot:item.unionFee.submit_union_fee.school_confirmed="{ item }">
        <span>{{ formatTime(item.unionFee.submit_union_fee.school_confirmed)}}</span>
      </template>
      <template v-slot:item.unionFee.amount_of_money="{ item }">
        <span>{{ item.unionFee.amount_of_money + ' VND'}}</span>
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
            v-if="unionFeeOfStudents.count"
            :length="unionFeeOfStudents ? Math.ceil(unionFeeOfStudents.count / selectedSize) : 0"
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
    <v-dialog v-model="collectionPeriodDialog" width="400px">
    <collection-period-dialog
      :title="dialogTitle"
      :content="dialogContent"
      @collection-period-dialog="collectionPeriodDialogHandler"
    ></collection-period-dialog>
  </v-dialog>
  <div class="invoice">
    <invoice :invoiceInfo="invoice" v-show="false"/>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import ConfirmDialog from '@/components/ConfirmDialog';
// import MESSAGE from '@/utils/message';
import role from '@/utils/role';
import timeUtils from "@/utils/time";
import CollectionPeriodDialog from "@/views/UnionFee/CollectionPeriodDialog";
import Invoice from '@/views/UnionFee/Invoice';
import MESSAGE from "@/utils/message";
export default {
  name: 'union-fee-of-student-list',
  components: {
    CollectionPeriodDialog,
    ConfirmDialog,
    Invoice,
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
      changeUnionFee: new Map(),
      command: '',
      loadingButton: false,
      roleUtils: role,
      searchOptions: [
        {
          name: 'Mã sinh viên',
          attribute: 'studentId'
        },
        {
          name: 'Lớp sinh hoạt',
          attribute: 'className',
        },
      ],
      headers: [
        {text: 'Mã sinh viên', value: 'id',},
        {text: 'Họ tên', value: 'name'},
        {text: 'Chi đoàn', value: 'activity_class.name'},
        {text: 'Đợt thu', value: 'unionFee.school_year'},
        {text: 'Số tiền', value: 'unionFee.amount_of_money'},
        {text: 'Đã nộp', value: 'unionFee.submit_union_fee.submitted',},
        {text: 'Ngày nộp', value: 'unionFee.submit_union_fee.submitted_at'},
        {text: 'Lớp xác nhận', value: 'unionFee.submit_union_fee.class_confirmed'},
        {text: 'Trường xác nhận', value: 'unionFee.submit_union_fee.school_confirmed'},
        {text: 'Người xác nhận', value: ''}
      ],
      dialogTitle: null,
      dialogContent: null,
      confirmDialogContent: null,
      collectionPeriodDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      unionFeeOfStudents: 'getUnionFeeOfStudents',
      invoice: 'getInvoice',
      currentUser: 'getUser',
    }),
  },

  methods: {
    ...mapActions({
      fetchGetUnionFeeOfStudents: 'fetchGetUnionFeeOfStudents',
      fetchSubmitUnionFee: 'fetchSubmitUnionFee',
      fetchConfirmSubmissionUnionFee: 'fetchConfirmSubmissionUnionFee',
      fetchGetInvoice: 'fetchGetInvoice',
    }),
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    async handlePageChange() {
      this.setQuery();
      await this.$router.push({
        name: 'union-fee',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetUnionFeeOfStudents(this.query);
      this.loading = false;
    },
    async changePageSize() {
      this.setQuery();
      await this.$router.push({
        name: 'union-fee',
        query: this.query,
      }).catch(() => {});
      this.loading = true;
      await this.fetchGetUnionFeeOfStudents(this.query);
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
      console.log('selectedOption - ', this.selectedOption);
      this.searchOptions.forEach(option => {
        if (option.attribute === this.selectedOption.attribute) {
          query[option.attribute] = this.searchText;
        }
      });
      this.currentPage = 1;
      this.selectedSize = 10;
      query.page = 1;
      query.size = 10;
      this.$router.push({
        name: 'union-fee',
        query: query,
      }).catch(() => {});
      await this.fetchGetUnionFeeOfStudents({query});
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
      const query = this.$router;
      console.log('query - ', query);
      this.query.page = this.currentPage;
      this.query.size = this.selectedSize;
    },
    formatTime(time) {
      return timeUtils.convertDateTimeToDate(time);
    },
    checkSubmission(student) {
      console.log(student.unionFee.submit_union_fee.submitted);
      this.changeUnionFee.set(student.unionFee.submit_union_fee.id, student.unionFee.submit_union_fee.submitted);
    },
    save() {
      this.command = 'Save';
      this.confirmDialogContent = "Bạn chắc chắn muốn lưu thông tin sổ đoàn đã chọn?"
      this.confirmDialog = true;
    },
    async processConfirmDialog(command) {
      console.log(command);
      if (command === 'Ok') {
        if (this.command == 'Save') {
          const changeUnionFee = Array.from(this.changeUnionFee, ([key, value]) => {
            return { id: key, submitted: value };
          });
          if (changeUnionFee.length === 0) {
            this.setSnackbar({
              type: 'info',
              visible: true,
              text: MESSAGE.NO_DATA_CHANGED,
            });
            this.confirmDialog = false;
            this.selected = [];
            return;
          }
          console.log('changeUnionFee - ', changeUnionFee);
          this.loadingButton = true;
          let isSuccess = await this.fetchSubmitUnionFee({changeUnionFee});
          this.loadingButton = false;
          if (isSuccess) {
            this.confirmDialog = false;
            this.selected = [];
            await this.fetchGetUnionFeeOfStudents(this.query);
          }
        }
        if (this.command == 'Confirm') {
          const unionFeeIds = this.selected.map(item => item.unionFee.submit_union_fee.id);
          this.loadingButton = true;
          let isSuccess = await this.fetchConfirmSubmissionUnionFee({unionFeeIds});
          this.loadingButton = false;
          if (isSuccess) {
            this.confirmDialog = false;
            this.selected = [];
            await this.fetchGetUnionFeeOfStudents(this.query);
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
    async printInvoice() {
      if (this.selected.length !== 1) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_ONE_RECORD_FOR_EXPORT_BILL,
        });
        return;
      }
      await this.fetchGetInvoice({
        studentId: this.selected[0].id,
        unionFeeId: this.selected[0].unionFee.id
      });
      if (this.invoice) {
        await this.$htmlToPaper('invoice-wrapper', {
          styles: [
            './invoice.css'
          ]
        });
        return;
      }
      this.setSnackbar({
        type: 'info',
        visible: true,
        text: MESSAGE.GET_INVOICE_FAIL,
      });
    },
    collectionPeriodDialogHandler(data) {
      if (data.command === 'Cancel') {
        this.collectionPeriodDialog = false;
      }
      if (data.command === 'Ok') {

      }
    }
  },
  async created() {
    this.setQuery();
    this.loading = true;
    await this.fetchGetUnionFeeOfStudents(this.query);
    console.log('submit-union-fee - ', this.unionFeeOfStudents);
    this.loading = false;
  },
};
</script>

<style lang="scss">
.union-fee-of-student-table {
  //overflow: auto;
  padding: 20px;
  background-color: #FFFFFF !important;
  max-width: 1100px !important;
  height: 100vh;
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


            &:nth-child(1) {
              min-width: 10px !important;
              max-width: 10px !important;
            }

            &:nth-child(2) {
              min-width: 120px !important;
              max-width: 120px !important;
            }

            &:nth-child(3) {
              min-width: 160px !important;
              max-width: 160px !important;
            }

            &:nth-child(4) {
              min-width: 100px !important;
              max-width: 100px !important;
            }

            &:nth-child(5) {
              min-width: 100px !important;
              max-width: 100px !important;
            }

            &:nth-child(6) {
              min-width: 120px !important;
              max-width: 100px !important;
            }

            &:nth-child(7) {
              min-width: 100px !important;
              max-width: 100px !important;
            }

            &:nth-child(8) {
              min-width: 120px !important;
              max-width: 120px !important;
            }
            &:nth-child(9) {
              min-width: 130px !important;
              max-width: 130px !important;
            }
            &:nth-child(10) {
              min-width: 150px !important;
              max-width: 150px !important;
            }
            &:nth-child(11) {
              min-width: 150px !important;
              max-width: 150px !important;
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