<template>
  <div class="form-card-block">
    <div class="form-card mt-4">
      <div class="form-title pl-4 pr-2 pb-1 pt-5">
        <span>{{ title }}</span>
      </div>
      <form class="form-block d-flex justify-center px-7">
        <div class="activity-image-block">
          <div class="activity-image">
            <img v-if="activityCoverUrl" :src="activityCoverUrl" alt="">
            <div v-if="!imageLoading" class="upload-button">
              <input
                class="file-input"
                id="file"
                type="file"
                accept="image/gif,image/jpg,image/png,image/svg,image/jpeg"
                @change="chooseImage($event)">
              <label class="choose-image" for="file"> Chọn ảnh bìa </label>
            </div>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
            ></v-progress-circular>

          </div>
        </div>
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
        <div class="activity-time">
          <div class="input-time-start">
            <span class="label">
              Thời gian bắt đầu
              <span class="require">(*)</span>
            </span>
            <div class="time-start">
              <date-picker
                class="input-date-time"
                v-model="beginAt"
                mode="dateTime"
                :masks="masks"
                is24hr
                :max-date="endAt"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>
            </div>
          </div>
          <div class="input-time-end">
            <span class="label">
              Thời gian kết thúc
              <span class="require">(*)</span>
            </span>
            <div class="time-end">
              <date-picker
                class="input-date-time"
                v-model="endAt"
                mode="dateTime"
                :masks="masks" is24hr
                :min-date="beginAt"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>
            </div>
          </div>
        </div>
        <div class="register-time">
          <div class="input-time-start">
            <span class="label">
              Thời gian mở đăng ký
              <span class="require">(*)</span>
            </span>
            <div class="time-start">
              <date-picker
                class="input-date-time"
                v-model="beginRegistrationAt"
                mode="dateTime"
                :max-date="endRegistrationAt"
                :masks="masks" is24hr>
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>
            </div>
          </div>
          <div class="input-time-end">
            <span class="label">
              Thời gian đóng đăng ký
              <span class="require">(*)</span>
            </span>
            <div class="time-end">
              <date-picker
                class="input-date-time"
                v-model="endRegistrationAt"
                mode="dateTime"
                :min-date="beginRegistrationAt"
                :masks="masks"
                is24hr>
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>
            </div>
          </div>
        </div>
        <div class="input-location">
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
        <div class="input-organization-unit">
          <span class="label">
            Đơn vị tổ chức
            <span class="require">(*)</span>
          </span>
          <v-text-field
            class="input-text"
            :rules="rules.require"
            v-model="organizationUnit"
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
              v-model="participantQuantity"
              required
              filled
              solo
              dense
              type="number"
              step="any"
              min="0"
              ref="input"
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
              type="number"
              step="any"
              min="0"
              ref="input"
            ></v-text-field>
          </div>
        </div>
        <div class="content-block">
          <span class="label">
              Nội dung
            </span>
          <ckeditor class="activity-content-editor" :editor="editor" v-model="editorData" :config="editorConfig"
                    @ready="onReady"></ckeditor>
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
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {DatePicker} from 'v-calendar'
import MESSAGE from '@/utils/message';
// import timeUtils from "@/utils/time";
import ConfirmDialog from "@/components/ConfirmDialog";

export default {
  name: 'AssociationUnionBranchForm',
  components: {
    DatePicker,
    ConfirmDialog,
  },
  data() {
    return {
      title: '',
      type: '',
      id: null,
      activityName: '',
      beginAt: null,
      endAt: null,
      beginRegistrationAt: null,
      endRegistrationAt: null,
      date: new Date(),
      activityCoverUrl: null,
      rules: {
        require: [(val) => (val || '').length > 0 || 'Trường bắt buộc'],
      },
      organizationUnit: '',
      participantUnit: '',
      place: '',
      participantQuantity: null,
      point: null,
      editor: DecoupledEditor,
      editorData: '',
      editorConfig: {
        language: 'vi',
      },
      imageLoading: false,
      timeZone: 'UTC',
      confirmDialog: false,
      dialogTitle: '',
      dialogContent: '',
      masks: {
        input: 'YYYY-MM-DD hh:mm'
      }
    };
  },
  computed: {
    ...mapGetters({
      page: 'getActivityPage',
      size: 'getActivitySize',
      activity: 'getActivity',
      activityList: 'getActivityList',
    })
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    ...mapActions({
      fetchCreateActivity: 'fetchCreateActivity',
      fetchGetActivityById: 'fetchGetActivityById',
      fetchUpdateActivity: 'fetchUpdateActivity',
      fetchUploadActivityCover: 'uploadActivityCover',
      fetchGetActivityList: 'fetchGetActivityList',
    }),
    getData() {
      if (
        this.activityName === '' ||
        this.organizationUnit === '' ||
        this.beginAt === '' ||
        this.endAt === '' ||
        this.beginRegistrationAt === '' ||
        this.endRegistrationAt === '' ||
        this.place === '' ||
        this.participantQuantity === '' ||
        this.page === '' ||
        this.point === ''
      ) {
        this.setSnackbar({
          type: 'warning',
          visible: true,
          text: MESSAGE.REQUIRE_FILL,
        });
        return null;
      }
      const data = {
        activityName: this.activityName,
        organizationUnit: this.organizationUnit,
        beginAt: this.beginAt,
        endAt: this.endAt,
        beginRegistrationAt: this.beginRegistrationAt,
        endRegistrationAt: this.beginRegistrationAt,
        place: this.place,
        participantQuantity: this.participantQuantity,
        point: this.point,
        content: this.editorData,
        coverUrl: this.activityCoverUrl,
      };
      return data;
    },
    async handleConfirm(command) {
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
      if (command === 'Ok') {
        let data = this.getData();
        let editResult = await this.fetchUpdateActivity({
          id: this.activity.id,
          activity: data
        });
        if (editResult) {
          this.$router.push({name: 'activity-list'});
        }
      }
    },
    async save() {
      let data = this.getData();
      console.log('data - ', data);
      if (this.type === 'Create') {
        const createResult = await this.fetchCreateActivity({activity: data});
        if (createResult) {
          this.$router.push({name: 'activity-list'});
        }
      }
      if (this.type === 'Edit') {
        this.dialogTitle = 'Xác nhận cập nhật';
        this.dialogContent = 'Bạn chắc chắn muốn cập nhật?'
        this.confirmDialog = true;
      }
    },
    cancel() {
      if (this.page !== '' && this.size !== '') {
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
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    },
    async chooseImage(e) {
      // let reader = new FileReader();
      this.activityCoverUrl = null;
      const imageSize = e.target.files[0].size / (1024 * 1024);
      if (imageSize >= 3) {
        this.setSnackbar({
          type: 'error',
          visible: true,
          text: MESSAGE.IMAGE_TOO_LARGE,
        });
      } else {
        this.imageLoading = true;
        const activityCoverUrl = await this.fetchUploadActivityCover({file: e.target.files[0]});
        this.activityCoverUrl = activityCoverUrl;
        this.imageLoading = false;
      }
      console.log(e.target.files[0]);
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
      await this.fetchGetActivityById({id: id});
      this.activityCoverUrl = this.activity.cover_url;
      this.activityName = this.activity.name;
      this.organizationUnit = this.activity.organization_unit;
      this.place = this.activity.place;
      this.beginAt = this.activity.begin_at;
      this.endAt = this.activity.end_at;
      this.beginRegistrationAt = this.activity.begin_registration_at;
      this.endRegistrationAt = this.activity.end_registration_at;
      this.point = this.activity.point + '';
      this.participantQuantity = this.activity.participant_quantity + '';
      this.editorData = this.activity.content;
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

      .activity-image-block {
        margin-top: 8px;
        margin-bottom: 8px;
        position: relative;

        .activity-image {
          border: 2px dashed #1976d2;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          //&:hover {
          //  background-color: #E0E0E0;
          //  transition: 0.5s;
          //}
          img {
            width: 640px;
            height: 200px;
          }

          .upload-button {
            position: absolute;
            top: 20;
            z-index: 20;

            input {
              display: none;
            }

            label {
              color: #E0E0E0;
              font: normal 400 17px Roboto;
              border: 1px solid #D9D9D9;
              padding: 4px 16px;
              border-radius: 8px;

              &:hover {
                background-color: #989797;
                cursor: pointer;
              }
            }
          }
        }

      }

      .input-name-activity {
        .v-input__slot {
          width: 100% !important;
        }
      }

      .input-date-time {
        input {
          border: 1px solid #CECECE;

          &:focus {
            outline: none;
          }

          &:hover {
            background-color: #E0E0E0;
            transition: 0.5s;
          }
        }
      }

      .organization-block {
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

      .activity-time, .register-time {
        display: flex;
        column-gap: 20px;
        margin-bottom: 16px;

        .time-start, .time-end {
          display: flex;
          column-gap: 10px;
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
