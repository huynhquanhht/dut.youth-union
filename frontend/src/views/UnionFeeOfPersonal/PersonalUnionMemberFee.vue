<template>
<div class="personal-union-member-fee">
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="unionFeeOfStudent && unionFeeOfStudent.union_fees ? unionFeeOfStudent.union_fees : []"
    :single-select="singleSelect"
    :items-per-page="selectedSize"
    scroll.sync="scrollSync"
    item-key="id"
    :loading="loading"
    loading-text="Đang tải dữ liệu... Vui lòng chờ"
    class="union-fee-table pl-3 pr-3 pb-3"
    fixed-header
    hide-default-footer
  >
    <template v-if="unionFeeOfStudent && !unionFeeOfStudent.union_fees" v-slot:no-data>
      Không có dữ liệu để hiển thị!
    </template>
    <template v-slot:top>
      <v-card-title>THÔNG TIN ĐOÀN PHÍ CÁ NHÂN</v-card-title>
    </template>
    <template v-slot:item.amount_of_money="{ item }">
      <span>{{ formatMoney(item.amount_of_money)}}</span>
    </template>
    <template v-slot:item.submit_union_fee.class_confirm="{ item }">
      <span>{{ formatTime(item.submit_union_fee.class_confirm)}}</span>
    </template>
    <template v-slot:item.submit_union_fee.school_confirm="{ item }">
      <span>{{ formatTime(item.submit_union_fee.school_confirm)}}</span>
    </template>
  </v-data-table>
</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import timeUtils from "@/utils/time";
import moneyUtils from "@/utils/money";

export default {
  name: 'union-fee-list',
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
        {text: 'Đã nộp', value: 'submit_union_fee.class_confirm',},
        {text: 'Trường xác nhận', value: 'submit_union_fee.school_confirm'},
      ],
      dialogTitle: null,
      dialogContent: null,
      confirmDialogContent: null,
    };
  },
  computed: {
    ...mapGetters({
      unionFeeOfStudent: 'getUnionFeeOfStudent',
    }),
  },

  methods: {
    ...mapActions({
      fetchGetUnionFeeOfStudent: 'fetchGetUnionFeeOfStudent',
    }),
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    formatTime(time) {
      return timeUtils.convertDateTimeToDate(time);
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
    this.loading = true;
    await this.fetchGetUnionFeeOfStudent();
    this.loading = false;
  },
};
</script>

<style lang="scss">
.personal-union-member-fee {
  //overflow: auto;
  padding: 20px 10px;
  height: 100vh;
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
</style>