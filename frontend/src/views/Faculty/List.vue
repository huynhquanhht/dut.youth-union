<template>
  <div class="faculty-wrapper">
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="faculties && faculties.rows ? faculties.rows : []"
        :single-select="singleSelect"
        scroll.sync="scrollSync"
        item-key="id"
        show-select
        :loading="loading"
        loading-text="Đang tải dữ liệu... Vui lòng chờ"
        class="abu-table"
        fixed-header
        hide-default-footer
        @click:row="clickFaculty"
    >
      <template
          v-if="faculties && !faculties.length"
          v-slot:no-data
      >
        Không có dữ liệu để hiển thị!
      </template>
      <template v-slot:top>
        <v-card-title>QUẢN LÝ LIÊN CHI ĐOÀN</v-card-title>
        <div class="toolbar mb-1" flat>
          <div class="toolbar-block d-flex justify-end">
            <div class="tool-block d-flex align-center">
              <v-btn
                  text
                  width="100px"
                  class="tool-button"
                  @click="openForm"
              >
                <v-icon dark size="24">mdi-plus</v-icon>
                Thêm mới
              </v-btn>
              <v-btn
                  text
                  width="100px"
                  class="tool-button"
                  @click="editFaculty"
              >
                <v-icon dark size="20">mdi-square-edit-outline</v-icon>
                Cập nhật
              </v-btn>
<!--              <v-btn-->
<!--                  text-->
<!--                  width="50px"-->
<!--                  class="tool-button"-->
<!--              >-->
<!--                <v-icon dark size="20">mdi-trash-can-outline</v-icon>-->
<!--                Xóa-->
<!--              </v-btn>-->
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
    <v-dialog
      v-model="formDialog"
      width="360px"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <faculty-form
        :faculty="faculty"
        :formType="formType"
        @faculty-form="facultyFormHandler"/>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      width="200px"
    >
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
import FacultyForm from './Form';
import MESSAGE from "@/utils/message";

export default {
  name: 'faculties',
  components: {
    FacultyForm,
    ConfirmDialog,
  },
  data() {
    return {
      singleSelect: true,
      selected: [],
      loading: false,
      dialog: false,
      formDialog: false,
      searchOptions: [
        {
          name: 'Mã số',
          attribute: 'id'
        },
        {
          name: 'Tên liên chi đoàn',
          attribute: 'name'
        },
        {
          name: 'Số chi đoàn',
          attribute: 'faculty.classQuantity',
        }
      ],
      headers: [
        {
          text: 'Mã số',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'Liên chi đoàn khoa', value: 'name'},
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Điện thoại',
          value: 'phone'
        },
        { text: 'Số chi đoàn', value: 'classQuantity'},
        { text: 'Bí thư', value: 'secretary.name'},
        { text: 'Email', value: 'secretary.email'},
        { text: 'Điện thoại', value: 'secretary.phone'}
      ],
      dialogTitle: null,
      dialogContent: null,
      formType: '',
    };
  },
  computed: {
    ...mapGetters({
      faculties: 'getFaculties',
      faculty: 'getFaculty',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'setSnackbar'
    }),
    ...mapActions({
      fetchGetFaculties: 'fetchGetFaculties',
      fetchGetFacultyById: 'fetchGetFacultyById',
      fetchCreateFaculty: 'fetchCreateFaculty',
      fetchUpdateFaculty: 'fetchUpdateFaculty',
    }),
    deleteItems() {
      this.dialogTitle = 'Xóa dữ liệu';
      this.dialogContent = 'Bạn chắc chắn muốn xóa dữ liệu đã chọn?';
      this.dialog = true;
    },
    handleConfirm() {
      this.dialog = false;
    },
    openForm() {
      this.formType = 'Create'
      this.formDialog = true;
    },
    async editFaculty() {
      if (this.selected.length === 0) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_RECORD_FOR_EDIT,
        });
        return;
      }
      if (this.selected.length > 1) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: MESSAGE.CHOOSE_ONE_RECORD_FOR_EDIT,
        });
        return;
      }
      await this.fetchGetFacultyById({ id: this.selected[0].id})
      this.formType = 'Update';
      this.formDialog = true;
    },
    async facultyFormHandler(data) {
      if (data.command === 'close') {
        this.selected = [];
        this.formDialog = false;
      }
      if (data.command === 'Create') {
        const isCreated = await this.fetchCreateFaculty({faculty: data.faculty});
        if (isCreated) {
          await this.fetchGetFaculties();
        }
        this.selected = [];
        this.formDialog = false;
      }
      if (data.command === 'Update') {
        console.log(data.faculty);
        const isUpdated = await this.fetchUpdateFaculty({faculty: data.faculty});
        if (isUpdated) {
          await this.fetchGetFaculties();
        }
        this.selected = [];
        this.formDialog = false;
      }
    },
    clickFaculty(e) {
      this.$router.push({ name: 'activity-class-list', query: {facultyId: e.id}})
    },
  },
  async created() {
    this.loading = true;
    await this.fetchGetFaculties();
    console.log(this.faculties);
    this.loading = false;
    console.log(this.faculties);
  },
};
</script>

<style lang="scss">
.faculty-wrapper {
  //height: 100vh;
  background-color: #FFFFFF !important;
  border-radius: 8px;
  max-width: 1100px;
  .v-data-table {
    border-radius: 20px !important;
  }
  .abu-table {
    padding: 20px 20px 20px 20px;
    background-color: #FFFFFF !important;
    border-radius: 20px !important;
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
                padding: 0px 24px;
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
                min-width: 40px !important;
                max-width: 40px !important;
                padding: 0px 24px;
              }

              &:nth-child(2) {
                min-width: 70px !important;
                max-width: 70px !important;
              }

              &:nth-child(3) {
                min-width: 200px !important;
              }

              &:nth-child(4) {
                min-width: 100px !important;
              }

              &:nth-child(6) {
                min-width: 120px !important;
                max-width: 120px !important;
              }
              &:nth-child(7) {
                min-width: 180px !important;
                max-width: 180px !important;
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
  }
}
</style>
