<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="roles && roles.rows ? roles.rows : []"
      :single-select="singleSelect"
      scroll.sync="scrollSync"
      item-key="id"
      show-select
      :loading="loading"
      loading-text="Đang tải dữ liệu... Vui lòng chờ"
      class="abu-table"
      fixed-header
      hide-default-footer
    >
      <template
        v-if="roles && !roles.length"
        v-slot:no-data
      >
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:item.created_at="{ item }">
        <span> {{ formatTime(item.created_at) }}</span>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <span> {{ formatTime(item.updated_at) }}</span>
      </template>
      <template v-slot:top>
        <v-card-title>DANH SÁCH NHÓM TÀI KHOẢN</v-card-title>
        <div class="toolbar mb-1" flat>
          <div class="toolbar-block d-flex justify-end">
            <div class="tool-block d-flex align-center">
              <v-btn
                text
                width="100px"
                class="tool-button"
                @click="create"
              >
                <v-icon dark size="24">mdi-plus</v-icon>
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
                @click="remove"
              >
                <v-icon dark size="20">mdi-trash-can-outline</v-icon>
                Xóa
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import timeUtils from "@/utils/time";
import MESSAGE from "@/utils/message";

export default {
  name: 'roles',
  components: {
  },
  data() {
    return {
      singleSelect: false,
      selected: [],
      loading: false,
      dialog: false,
      formDialog: false,
      totalNumberOfItems: 0,
      totalVisible: 5,
      searchOptions: [
        {
          name: 'Mã số',
          attribute: 'id'
        },
        {
          name: 'Tên nhóm',
          attribute: 'name'
        },
        {
          name: 'Số người dùng',
          attribute: 'role.row.users',
        }
      ],
      headers: [
        {
          text: 'Mã số',
          align: 'start',
          sortable: false,
          value: 'id',
        },
         {text: 'Tên nhóm', value: 'name'},
        { text: 'Số người dùng', value: 'users.length'},
        { text: 'Ngày tạo', value: 'created_at'},
        { text: 'Ngày cập nhật', value: 'updated_at'}
      ],
      dialogTitle: null,
      dialogContent: null,
    }
      ;
  },
  computed: {
    ...mapGetters({
      roles: 'getRoles',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetAllRoles: 'fetchGetAllRoles',
    }),
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    deleteItems() {
      this.dialogTitle = 'Xóa dữ liệu';
      this.dialogContent = 'Bạn chắc chắn muốn xóa dữ liệu đã chọn?';
      this.dialog = true;
    },
    handleConfirm() {
      this.dialog = false;
    },
    formatTime(time) {
      return timeUtils.convertDateTimeToDate(time);
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
    remove() {
      this.setSnackbar({
        type: 'info',
        visible: true,
        text: MESSAGE.FEATURE_DEVELOP,
      });
    }
  },
  async created() {
    this.loading = true;
    await this.fetchGetAllRoles();
    this.loading = false;
  },
};
</script>

<style lang="scss">
.abu-table {
  height: 100vh;
  background-color: #FFFFFF !important;
  padding: 20px 20px 20px 20px;
  border-radius: 8px !important;
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
              min-width: 200px !important;
            }

            &:nth-child(4) {
              min-width: 100px !important;
            }

            &:nth-child(5) {
              min-width: 100px !important;
            }

            &:nth-child(6) {
              min-width: 300px !important;
            }

            &:nth-child(7) {
              min-width: 100px !important;
            }

            &:nth-child(8) {
              min-width: 300px !important;
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
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
  }

  .row-count-select {
    width: 64px;
    margin-top: 8px;
    font: normal 400 14px Roboto !important;

    .v-input__slot {
      min-height: unset !important;
      padding: 0px 0px 0px 8px !important;
      margin-top: 5px !important;
      box-shadow: none !important;
      border: 1px solid #d9d9d9 !important;
    }
  }
}
</style>
