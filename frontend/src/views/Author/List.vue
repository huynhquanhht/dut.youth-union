<template>
  <div class="authorization-wrapper pl-3 pr-3">
    <v-card-title>Quản lý phân quyền</v-card-title>
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
              solo
              dense
            ></v-select>
          </div>
          <div class="func-search d-flex align-center" >
            <span class="text-content mr-1">Nhóm chức năng: </span>
            <v-text-field
              solo
              dense
              filled
              prepend-inner-icon="mdi-magnify"
              hide-details="false"
              class="input-search"
            ></v-text-field>
          </div>

        </div>
        <div class="tool-button-block d-flex align-center">
          <v-btn
            text
            width="50px"
            class="tool-button"
          >
            <v-icon dark size="22">fa-save</v-icon>
            <span class="ml-1">Lưu</span>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="group-func-block">
      <v-row
        class="row-func-block d-flex flex-column"
        v-for="groupFunction in role.rows"
        :key="groupFunction.id">
        <div class="group-func-name"> {{ groupFunction.name }}</div>
        <div class="col-func-block d-flex flex-row">
          <v-col
            class="col-func d-flex align-center"
            xs="3" sm="3" md="3" lg="3" xl="3"
            v-for="func in groupFunction.functions"
            :key="func.id"
          >
            <v-simple-checkbox
              color="info"
              v-model="func.permission.is_access"
            ></v-simple-checkbox>
            <span class="text-content">{{ func.name }}</span>
          </v-col>
        </div>
      </v-row>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
  computed: {
    ...mapGetters({
      role: 'getRole',
    })
  },
  methods: {
    ...mapActions({
      fetchGetRoleById: 'fetchGetRoleById',
    }),

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
    font: normal 500 17px Roboto;
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
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 8px;

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