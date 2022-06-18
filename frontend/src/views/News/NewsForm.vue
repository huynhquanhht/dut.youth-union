<template>
  <div class="form-card-block">
    <div class="form-card mt-4">
      <div class="form-title pl-4 pr-2 pb-1 pt-5">
        <span>{{ title }}</span>
      </div>
      <form class="form-block d-flex justify-center px-7">
        <div class="news-image-block">
          <div class="news-image">
            <img v-if="newsCoverUrl" :src="newsCoverUrl" alt="">
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
        <div class="input-title-news">
          <span class="label">
            Tiêu đề
            <span class="require">(*)</span>
          </span>
          <v-text-field
            class="input-text"
            :rules="rules.require"
            v-model="newsTitle"
            filled
            required
            solo
            dense
          ></v-text-field>
        </div>
        <div class="selected-row-block pagi-info">
          <span class="label">
            Loại tin tức
            <span class="require">(*)</span>
          </span>
          <v-select
            filled
            solo
            dense
            hide-details="false"
            v-model="selectedNewsCategory"
            class="row-count-select"
            :items="newsCategory"
            item-text="name"
            return-object
            single-line
          ></v-select>
        </div>
        <div class="content-block">
          <span class="label">
              Nội dung
            </span>
          <ckeditor
            class="news-content-editor"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
            @ready="onReady">
          </ckeditor>
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
import MESSAGE from '@/utils/message';
import ConfirmDialog from "@/components/ConfirmDialog";

export default {
  name: 'AssociationUnionBranchForm',
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      title: '',
      type: '',
      id: null,
      newsTitle: '',
      newsCoverUrl: null,
      rules: {
        require: [(val) => (val || '').length > 0 || 'Trường bắt buộc'],
      },
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
      newsCategory: [
        {
          id: 1,
          name: 'Thông tin'
        },
        {
          id: 2,
          name: 'Thông báo',
        }],
      selectedNewsCategory: {},
    };
  },
  computed: {
    ...mapGetters({
      news: 'getNews',
      newsList: 'getNewsList',
    })
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'setSnackbar',
    }),
    ...mapActions({
      fetchCreateNews: 'fetchCreateNews',
      fetchGetNewsById: 'fetchGetNewsById',
      fetchUpdateNews: 'fetchUpdateNews',
      fetchUploadNewsCover: 'uploadActivityCover',
      fetchGetNewsList: 'fetchGetActivityList',
    }),
    getData() {
      if (
        this.newsCoverUrl === '' ||
        this.newsTitle === '' ||
        this.editorData === '' ||
        this.selectedNewsCategory.length === 0
      ) {
        this.setSnackbar({
          type: 'warning',
          visible: true,
          text: MESSAGE.REQUIRE_FILL,
        });
        return null;
      }
      const data = {
        title: this.newsTitle,
        content: this.editorData,
        coverUrl: this.newsCoverUrl,
        category: this.selectedNewsCategory.id
      };
      return data;
    },
    async handleConfirm(command) {
      if (command === 'Cancel') {
        this.confirmDialog = false;
      }
      if (command === 'Ok') {
        let data = this.getData();
        let editResult = await this.fetchUpdateNews({
          id: this.news.id,
          news: data
        });
        if (editResult) {
          this.$router.push({name: 'news-list'});
        }
      }
    },
    async save() {
      let data = this.getData();
      if (this.type === 'Create') {
        let createResult = await this.fetchCreateNews({news: data});
        if (createResult) {
          this.$router.push({name: 'news-list'});
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
        this.$router.push({name: 'news-list'});
        return;
      }
      this.$router.push({
        name: 'news-list',
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
      this.newsCoverUrl = null;
      const imageSize = e.target.files[0].size / (1024 * 1024);
      if (imageSize >= 3) {
        this.setSnackbar({
          type: 'error',
          visible: true,
          text: MESSAGE.IMAGE_TOO_LARGE,
        });
      } else {
        this.imageLoading = true;
        const newsCoverUrl = await this.fetchUploadNewsCover({file: e.target.files[0]});
        this.newsCoverUrl = newsCoverUrl;
        this.imageLoading = false;
      }
    },
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
    this.title = 'Tạo mới tin tức';
    this.type = 'Create';
    if (this.$route.params.id) {
      this.title = 'Cập nhật tin tức';
      this.type = 'Edit';
      await this.fetchGetNewsById({id: id});
      this.newsCoverUrl = this.news.cover_url;
      this.editorData = this.news.content;
      this.newsTitle = this.news.title;
      this.selectedNewsCategory = this.newsCategory[this.news.category - 1];
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
    width: 1000px;
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

      .news-image-block {
        margin-top: 8px;
        margin-bottom: 8px;
        position: relative;

        .news-image {
          border: 2px dashed #1976d2;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          //&:hover {
          //  background-color: #E0E0E0;
          //  transition: 0.5s;
          //}
          img {
            width: 640px;
            height: 300px;
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

      .input-title-news {
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

    .news-content-editor {
      border: 1px solid #d9d9d9 !important;
      min-height: 600px;

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
