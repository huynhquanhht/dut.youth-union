<template>
  <div class="form-card-block">
    <div class="form-card mt-4">
      <div class="form-title pl-4 pr-2 pb-1 pt-5">
        <span>{{ title }}</span>
      </div>
      <form class="form-block d-flex justify-center px-7">
        <div class="input-name-activity">
          <span class="label">
            Tên hoạt động
            <span class="require">(*)</span>
          </span>
          <v-text-field
            class="input-text"
            :rules="rules.require"
            v-model="activityName"
            filled
            required
            solo
            dense
          ></v-text-field>
        </div>
        <div class="organization-block">
          <div class="input-organization-level">
            <span class="label">
              Cấp tổ chức
              <span class="require">(*)</span>
            </span>
            <v-select
              filled
              class="level-select mr-2"
              v-model="organizationLevel"
              :items="organizationLevels"
              solo
              dense
              label="Nhấn để chọn"
              :rules="rules.require"
              required
            ></v-select>
          </div>
          <div class="input-organization-unit">
            <span class="label">
              Đơn vị tổ chức
              <span class="require">(*)</span>
            </span>
            <v-autocomplete
            class="search-fill"
            prepend-inner-icon="mdi-magnify"
            dense
            filled
            solo
            label="Nhập để tìm kiếm"
            :rules="rules.require"
            required
          >
            <template v-slot:selection="data">
              <span>{{ data.item.name }}</span>
            </template>
          </v-autocomplete>
          </div>
        </div>
        <div class="participant-block">
          <div class="input-participant-level">
            <span class="label">
              Cấp tham gia
              <span class="require">(*)</span>
            </span>
            <v-select
              filled
              class="level-select mr-2"
              v-model="participantLevel"
              :items="participantLevels"
              solo
              dense
              label="Nhấn để chọn"
              :rules="rules.require"
              required
            ></v-select>
          </div>
          <div class="input-participant-unit">
            <span class="label">
              Đơn vị tham gia
              <span class="require">(*)</span>
            </span>
            <v-autocomplete
            class="search-fill"
            prepend-inner-icon="mdi-magnify"
            dense
            filled
            solo
            :rules="rules.require"
            required
            label="Nhập để tìm kiếm"
          >
            <template v-slot:selection="data">
              <span>{{ data.item.name }}</span>
            </template>
          </v-autocomplete>
          </div>
        </div>
        <div class="activity-time">
          <div class="input-time-start">
            <span class="label">
              Thời gian bắt đầu
              <span class="require">(*)</span>
            </span>
            <div class="time-start">
              <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDateFormatted"
                    label="Ngày"
                    persistent-hint
                    v-bind="attrs"
                    @blur="startDate = parseDate(startDateFormatted)"
                    v-on="on"
                    filled
                    solo
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  no-title
                  @input="startDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                ref="startTimeMenu"
                v-model="startTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTime"
                    label="Giờ"
                    readonly
                    filled
                    solo
                    dense
                    v-bind="attrs"
                    v-on="on"
                    class="input-text"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="startTimeMenu"
                  v-model="startTime"
                  format="24hr"
                  full-width
                  @click:minute="$refs.startTimeMenu.save(startTime)"
                ></v-time-picker>
              </v-menu>
            </div>
          </div>
          <div class="input-time-end">
            <span class="label">
              Thời gian kết thúc
              <span class="require">(*)</span>
            </span>
            <div class="time-end">
              <v-menu
                ref="endDateMenu"
                v-model="endDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDateFormatted"
                    label="Ngày"
                    persistent-hint
                    v-bind="attrs"
                    @blur="endDate = parseDate(endDateFormatted)"
                    v-on="on"
                    filled
                    solo
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  no-title
                  @input="endDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                ref="endTimeMenu"
                v-model="endTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="endTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endTime"
                    label="Giờ"
                    readonly
                    filled
                    solo
                    dense
                    v-bind="attrs"
                    v-on="on"
                    class="input-text"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="endTimeMenu"
                  v-model="endTime"
                  format="24hr"
                  full-width
                  @click:minute="$refs.endTimeMenu.save(endTime)"
                ></v-time-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="input-email">
          <span class="label">
            Địa điểm
            <span class="require">(*)</span>
          </span>
          <v-text-field
            class="input-text"
            :rules="rules.require"
            v-model="place"
            required
            filled
            solo
            dense
          ></v-text-field>
        </div>
        <div class="input-quantity-point">
          <div class="input-quantity">
            <span class="label">
              Số lượng tham gia
              <span class="require">(*)</span>
            </span>
            <v-text-field
              class="input-text"
              :rules="rules.require"
              v-model="joinQuantity"
              required
              filled
              solo
              dense
            ></v-text-field>
          </div>
          <div class="input-point">
            <span class="label">
              Điểm quy đổi
              <span class="require">(*)</span>
            </span>
            <v-text-field
              class="input-text"
              :rules="rules.require"
              v-model="point"
              required
              filled
              solo
              dense
            ></v-text-field>
          </div>
        </div>
        <div class="content-block">
          <span class="label">
              Nội dung
            </span>
          <ckeditor class="activity-content-editor" :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady"></ckeditor>
        </div>
      </form>
      <div class="btn-block">
        <v-btn class="btn mr-2" color="error" @click="cancel">
          Hủy
        </v-btn>
        <v-btn class="btn" color="primary" @click="save">
          Lưu
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MESSAGE from '@/utils/message';
export default {
  name: 'AssociationUnionBranchForm',
  data() {
    return {
      title: '',
      type: '',
      id: null,
      activityName: '',
      startDate: null,
      startDateFormatted: null,
      startDateMenu: false,
      endDate: null,
      endDateFormatted: null,
      endDateMenu: false,
      startTime: null,
      startTimeMenu: null,
      endTime: null,
      endTimeMenu: false,
      rules: {
        require: [(val) => (val || '').length > 0 || 'Trường bắt buộc'],
      },
      organizationLevels: ['Đoàn ĐHĐN', 'Đoàn trường', 'Liên chi đoàn'],
      organizationLevel: '',
      organizationUnit: '',
      participantLevels: ['Đoàn trường', 'Liên chi đoàn', 'Chi đoàn'],
      participantLevel: '',
      participantUnit: '',
      place: '',
      joinQuantity: null,
      point: null,
      editor: DecoupledEditor,
      editorData: '',
      editorConfig: {
        language: 'vi',
        }
    };
  },
  computed: {
    ...mapGetters({
      page: 'getActivityPage',
      size: 'getActivitySize',
      activity: 'getActivity',
    })
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    ...mapActions({
      fetchCreateActivity: 'fetchCreateActivity',
      fetchGetById: 'fetchGetById',
      fetchUpdateActivity: 'fetchUpdateActivity',
    }),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    async save() {
        if (
          this.activityName === '' ||
          this.organizationLevel === '' ||
          this.organizationUnit === '' ||
          this.startDateFormatted === '' ||
          this.startTime === '' ||
          this.endDateFormatted === '' ||
          this.endTime === '' ||
          this.place === '' ||
          this.joinQuantity === '' ||
          this.page === '' ||
          this.point === ''
        ) {
          this.setSnackbar({
            type: 'warning',
            visible: true,
            text: MESSAGE.REQUIRE_FILL,
          });
          return;
        }
        const data =  {
            activityName: this.activityName,
            organizationUnit: this.organizationUnit,
            organizationLevel: this.organizationLevel,
            startTime: this.startDateFormatted.split('/').reverse().join('-') + ' ' + this.startTime,
            endTime: this.endDateFormatted.split('/').reverse().join('-') + ' ' + this.endTime,
            place: this.place,
            joinQuantity: this.joinQuantity,
            point: this.point,
          };
          if (this.type === 'Create') {
            let createResult = this.fetchCreateActivity({activity: data});
            if (createResult) {
              this.$router.push({ name: 'activity-list'});
            }
          }
          if (this.type === 'Edit') {
            let editResult = await this.fetchUpdateActivity({
              id: this.activity.id,
              activity: data});
            if (editResult) {
              this.$router.push({ name: 'activity-list'});
            }
          }
      },
      cancel() {
        if(this.page !== '' && this.size !== '') {
          this.$router.push({name: 'activity-list'});
          return;
        }
        this.$router.push({
          name: 'activty-list',
          query: {
            page: this.page,
            size: this.size,
          },
       });
      },
    onReady( editor )  {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    }
  },
  watch: {
    startDate() {
      this.startDateFormatted = this.formatDate(this.startDate);
    },
    endDate() {
      this.endDateFormatted = this.formatDate(this.endDate);
    },
  },
  async created() {
    const id = this.$route.params.id;
    this.title = 'Tạo mới hoạt động';
    this.type = 'Create';
    if (this.$route.params.id) {
      this.title = 'Chỉnh sửa hoạt động';
      this.type = 'Edit';
      await this.fetchGetById({id: id});
      this.activityName = this.activity.name;
      this.organizationLevel = this.activity.organization_level;
      this.organizationUnit = this.activity.organization_unit;
      this.place = this.activity.place;
      this.startTime = this.activity.start_time.split(' ')[0];
      this.startDateFormatted = this.activity.start_time.split(' ')[1];
      this.endTime = this.activity.end_time.split(' ')[0];
      this.endDateFormatted = this.activity.end_time.split(' ')[1];
      this.point = this.activity.point;
      this.joinQuantity = this.activity.join_quantity;
    }
  }
};
</script>

<style lang="scss">
.form-card-block {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 72px);
  .form-card {
    width: 700px;
    border-radius: 8px;
    background-color: #ffffff;
    .form-title {
      color: #1976d2;
      text-transform: uppercase;
      text-align: center;
      font: normal 600 18px Roboto;
    }
    .form-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .v-input__slot {
        box-shadow: none !important;
        border: 1px solid #d9d9d9 !important;
      }
      .input-name-activity {
        .v-input__slot {
          width: 100% !important;
        }
      }
      .organization-block {
        display: flex;
        justify-content: center;
        column-gap: 10px;
        .input-organization-level {
          width: 30%;
          .v-input__slot {
            width: inherit;
            padding: 0px 0px 0px 8px !important;
          }
          .v-label {
            position: unset;
            margin-top: -4px;
            font: normal 400 14px Roboto;
          }
        }
        .input-organization-unit {
          width: 70%;
          .v-input__slot {
            width: inherit;
            padding-right: 2px !important;
            padding-left: 6px !important;
          }
          .v-label {
            position: unset;
            margin-top: -4px;
            font: normal 400 14px Roboto;
          }
          .v-input__control input {
            color: #424242d8 !important;
            font: normal 400 14px Roboto !important;
          }
          .v-select__selections {
            span {
              color: #424242d8 !important;
              font: normal 400 15px Roboto !important;
            }
          }
          .v-input__append-outer {
            margin: 0 !important;
          }
          .v-input {
            column-gap: 8px !important;
          }
        }
      }
      .participant-block {
        display: flex;
        justify-content: center;
        column-gap: 10px;
        .input-participant-level {
          width: 30%;
          .v-input__slot {
            width: inherit;
            padding: 0px 0px 0px 8px !important;
          }
          .v-label {
            position: unset;
            margin-top: -4px;
            font: normal 400 14px Roboto;
          }
        }
        .input-participant-unit {
          width: 70%;
           .v-input__slot {
            width: inherit;
            padding-right: 2px !important;
             padding-left: 6px !important;
          }
          .v-label {
            position: unset;
            margin-top: -4px;
            font: normal 400 15px Roboto;
          }
          .v-input__control input {
            color: #424242d8 !important;
            font: normal 400 14px Roboto !important;
          }
          .v-select__selections {
            span {
              color: #424242d8 !important;
              font: normal 400 15px Roboto !important;
            }
          }
          .v-input__append-outer {
            margin: 0 !important;
          }
          .v-input {
            column-gap: 8px !important;
          }
        }
      }
      .input-quantity-point {
        display: flex;
        justify-content: center;
        column-gap: 10px;
        .input-quantity {
          width: 50%;
          .v-input__slot {
            width: inherit !important;
          }
        }
        .input-point {
          width: 50%;
          .v-input__slot {
            width: inherit !important;
          }
        }
      }
      .activity-time {
        display: flex;
        column-gap: 20px;
        .input-time-start {
          .time-start {
            display: flex;
            column-gap: 10px;
          }
          .v-text-field__slot {
            label {
              top: 7px;
              font: normal 400 14px Roboto !important;
              width: 50px;
            }
          }
        }
        .input-time-end {
          .time-end {
            display: flex;
            column-gap: 10px;
          }
          .v-text-field__slot {
            label {
              top: 7px;
              font: normal 400 14px Roboto !important;
              width: 50px;
            }
          }
        }
      }
      .v-text-field .v-input__control .v-input__slot {
        min-height: 32px !important;
        font: normal 400 14px Roboto !important;
      }
      .label {
        font: normal 400 14px Roboto !important;
      }
      .v-text-field__details {
        margin-bottom: 0px !important;
      }
      .require {
        color: red;
      }
    }
    .btn-block {
      margin-top: 8px;
      padding: 0 28px 16px 16px;
      display: flex;
      justify-content: center;
      .btn {
        text-transform: unset !important;
        font: normal 400 15px Roboto !important;
        letter-spacing: 0;
        width: 80px;
      }
    }
    .activity-content-editor {
      border: 1px solid #d9d9d9 !important;
      min-height: 200px;
      &:hover {
        background-color: #E0E0E0;
      }
      &:focus {
        background-color: #FFFFFF;
      }
    }
  }
}
</style>
