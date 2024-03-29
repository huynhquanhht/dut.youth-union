<template>
  <div class="authorization-wrapper pl-3 pr-3">
    <v-card-title>QUẢN LÝ PHÂN QUYỀN</v-card-title>
    <div class="toolbar-block mb-7">
      <div class="tool-block d-flex justify-space-between">
        <div class="search-block d-flex align-center">
          <div class="author-search d-flex align-center">
            <span class="text-content mr-1">Phân quyền: </span>
            <v-select
              filled
              label="Tìm kiếm theo"
              class="search-select mr-2"
              hide-details="false"
              item-text="name"
              item-value="roleId"
              solo
              dense
              :items="selectOptions"
              v-model="selectedOption"
              @change="getFunctionListByRole"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <div class="group-func-block">
      <v-row
        class="row-func-block d-flex flex-column"
        v-for="groupFunction in role.rows"
        :key="groupFunction.id">
        <div class="group-func-name mb-4"> {{ groupFunction.name }}</div>
        <div class="col-func-block d-flex flex-row">
          <v-row>
          <v-col
            class="col-func d-flex align-center"
            xs="3" sm="3" md="3" lg="3" xl="2"
            v-for="func in groupFunction.functions"
            :key="func.id"
          >
            <v-simple-checkbox
              color="info"
              v-model="func.permission.is_access"
              @click="changePermission(func, func.permission.is_access)"
            ></v-simple-checkbox>
            <span class="text-content">{{ func.name }}</span>
          </v-col>
          </v-row>
        </div>
      </v-row>
    </div>
    <v-dialog v-model="confirmDialog" width="400px" persistent>
    <confirm-dialog
      @confirm-dialog="handleConfirm"
      :title="dialogTitle"
      :content="dialogContent"
    ></confirm-dialog>
  </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
  name: "List",
  components: {
    ConfirmDialog,
  },
  computed: {
    ...mapGetters({
      role: 'getRole',
    })
  },
  data() {
    return {
      selectedOption: 1,
      confirmDialog: false,
      dialogTitle: '',
      dialogContent: '',
      roleId: 1,
      func: null,
      action: '',
      isAccess: null,
      selectOptions: [
        {
          name: 'Quản trị viên',
          roleId: 1,
        },
        {
          name: 'Chuyên viên',
          roleId: 2,
        },
        {
          name: 'Ban thường vụ',
          roleId: 3,
        },
        {
          name: 'Bí thư liên chi đoàn',
          roleId: 4,
        },
        {
          name: 'Bí thư chi đoàn',
          roleId: 5,
        },
        {
          name: 'Sinh viên',
          roleId: 6,
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      fetchGetRoleById: 'fetchGetRoleById',
      fetchUpdatePermission: 'fetchUpdatePermission',
    }),
    getFunctionListByRole(roleId) {
      console.log(this.selectedOption);
      this.roleId = roleId;
      this.fetchGetRoleById({id: this.roleId});
    },
    changePermission(func, isAccess) {
      let roleName = '';
      if (isAccess) {
        console.log('selectedOption - ', this.selectedOption);
        roleName = this.selectOptions.filter(item => item.roleId === this.selectedOption)[0].name;
        this.dialogTitle = 'Xác nhận cấp quyền';
        this.dialogContent = `Bạn chắc chắn muốn cấp quyền sử dụng tính năng ${func.name} cho vai trò ${roleName}`;
      } else {
        roleName = this.selectOptions.filter(item => item.roleId === this.selectedOption)[0].name;
        this.dialogTitle = 'Xác nhận dừng cấp quyền';
        this.dialogContent = `Bạn chắc chắn muốn dừng cấp quyền sử dụng tính năng ${func.name} cho vai trò ${roleName}?`;
      }
      this.action = 'Update'
      this.isAccess = isAccess;
      console.log('func - ', func);
      this.func = func;
      this.confirmDialog = true;
    },
    async handleConfirm(command) {
      if (command === 'Ok') {
        if (this.action === 'Update') {
          await this.fetchUpdatePermission({
            permission: {
              id: this.func.permission.id,
              isAccess: this.isAccess,
            }
          });
          this.confirmDialog = false;
          await this.fetchGetRoleById({id: this.roleId});
          return;
        }
      }
      if (command === 'Cancel') {
        await this.fetchGetRoleById({id: this.roleId});
        this.confirmDialog = false;
      }
    },
  },
  created() {
    this.fetchGetRoleById({id: 1});
  }
}
</script>

<style lang="scss">
.authorization-wrapper {
  .text-content {
    font: normal 400 15px Roboto;
  }
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
      width: 100%;
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
  .group-func-block {
    padding: 0px 12px;
    .row-func-block {
      padding: 12px 12px;
      border-radius: 4px;
      margin-bottom: 8px;
      background-color: #FFFFFF;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      &:nth-child(odd) {
        border-left: 4px solid #0078D4;
      }
      &:nth-child(even) {
        border-left: 4px solid #F57C00;
      }
      .group-func-name {
        font-weight: 500;
        margin-bottom: 4px;
      }
      .col-func-block {
        .col-func {
          height: 20px !important;
          margin-bottom: 12px;
          .v-input--selection-controls__ripple {
            height: 30px;
            width: 30px;
            left: -11px;
            top: calc(50% - 23px);
            margin: 8px;
          }
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
      input {
        padding: 0px !important;
      }
    }

    .v-icon {
      font-size: 20px !important;
      margin-top: 1px;
    }
    span {
      padding-top: 4px;
    }
    .func-search {
      .v-input__slot {
        margin-top: 4px !important;
      }
    }
  }
}
</style>